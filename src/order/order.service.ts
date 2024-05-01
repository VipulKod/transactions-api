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
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  // Finds a single order by its ID
  async findOne(order_id: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        order_id: order_id,
      },
    });
  }

  // Finds an order that matches the given order type and unit price
  async findOrderMatch(
    order_type: OrderType,
    unit_price: number,
  ): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        order_type:
          order_type === OrderType.BUY? OrderType.SELL : OrderType.BUY,
          unit_price: unit_price,
      },
    });
  }

  // Creates a new order, sets its status to OPEN, saves it to the repository, and emits an event
  async create(order: Partial<Order>): Promise<Order> {
    order.status = OrderStatus.OPEN;
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
