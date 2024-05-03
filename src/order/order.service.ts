import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus, OrderType } from './entities/order.entity';
import { OrderPlacedEvent } from './event/order-placed.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private eventEmitter: EventEmitter2,
  ) {}

  // Fetches all orders from the repository
  async findAll(): Promise<any[]> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .select([
        'order.order_id AS order_id',
        'order.order_type AS order_type',
        'order.unit_price AS unit_price',
        'order.quantity AS quantity',
        'order.status AS status',
        'order.original_quantity AS original_quantity',
        'order.created_at AS created_at',
        'user.user_id AS user_id',
      ])
      .getRawMany();
  }

  // Finds a single order by its ID
  async findOne(order_id: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        order_id: order_id,
      },
      relations: ['user'],
    });
  }

  async findOrdersByUserIdAndDate(
    userId: string,
    date?: string,
  ): Promise<Order[]> {
    const query = this.orderRepository.createQueryBuilder('order');

    // Add a condition to filter by userId
    query.where('order.user_id = :userId', { userId });

    // Optionally filter by date
    if (date) {
      // Parse the date string into day, month, and year components
      const [day, month, year] = date.split('/');
      // Construct a new Date object from the parsed components
      const parsedDate = new Date(parseInt(year), month as any, day as any); // Note: months are 0-indexed in JavaScript
      // Use the parsed date for the query
      console.log(parsedDate);
      query.andWhere('order.created_at <= :date', { date: parsedDate });
    }

    // Execute the query
    return query.getMany();
  }

  // Finds an order that matches the given order type and unit price
  async findOrderMatch(
    order_type: OrderType,
    unit_price: number,
  ): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        order_type:
          order_type === OrderType.BUY ? OrderType.SELL : OrderType.BUY,
        unit_price: unit_price,
      },
    });
  }

  // Creates a new order, sets its status to OPEN, saves it to the repository, and emits an event
  async create(order: Partial<Order>): Promise<Order> {
    order.status = OrderStatus.OPEN;
    order.original_quantity = order.quantity;
    const newOrder = this.orderRepository.create(order);
    const savedOrder = await this.orderRepository.save(newOrder);
    this.eventEmitter.emit(
      'order.placed',
      new OrderPlacedEvent(
        savedOrder.order_id,
        savedOrder.user.user_id,
        savedOrder.order_type,
      ),
    );
    return savedOrder;
  }

  // Updates an existing order and returns the updated order
  async update(order_id: string, order: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(order_id, order);
    return await this.orderRepository.findOne({
      where: {
        order_id: order_id,
      },
    });
  }

  // Deletes an order by its ID
  async delete(orderId: string): Promise<void> {
    await this.orderRepository.delete(orderId);
  }
}
