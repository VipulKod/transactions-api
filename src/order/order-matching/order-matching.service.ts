import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { OrderService } from '../order.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OrderPlacedEvent } from '../event/order-placed.event';
import { OrderStatus } from '../entities/order.entity';

@Injectable()
export class OrderMatchingService {
  constructor(
    private orderService: OrderService,
    private readonly transactionService: TransactionService,
    private eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('order.placed')
  async handleOrderPlaced(event: OrderPlacedEvent) {
    const newOrder = await this.orderService.findOne(event.orderId);
  
    // Logic to match orders and record transactions
    const matchingOrder = await this.orderService.findOrderMatch(
      event.orderType,
      newOrder.unit_price,
    );
  
    if (matchingOrder) {
      // Determine the transaction quantity based on the matched orders
      let transactionQuantity = Math.min(
        newOrder.quantity,
        matchingOrder.quantity,
      );
  
      // Create a transaction
      await this.transactionService.createTransaction(
        newOrder.order_id, // buyOrderId
        matchingOrder.order_id, // sellOrderId
        newOrder.unit_price, // unitPrice
        transactionQuantity, // quantity
      );
  
      // Update the status of the new order based on the transaction quantity
      const updatedOrderStatus =
        transactionQuantity === newOrder.quantity
         ? OrderStatus.COMPLETED
          : OrderStatus.PARTIAL;
      newOrder.status = updatedOrderStatus;
  
      const updatedOrder = await this.orderService.update(
        event.orderId,
        newOrder,
      );
  
      // Emit order_updated event
      this.eventEmitter.emit('order.updated', updatedOrder);
  
      // Update the seller's order status and quantity based on the transaction outcome
      if (transactionQuantity === matchingOrder.quantity) {
        await this.orderService.update(matchingOrder.order_id, {
          status: OrderStatus.COMPLETED,
          quantity: 0,
        });
      } else if (transactionQuantity < matchingOrder.quantity) {
        // If the buyer's unit is more than the seller's unit, update the seller's order status and quantity
        await this.orderService.update(matchingOrder.order_id, {
          status: OrderStatus.PARTIAL,
          quantity: matchingOrder.quantity - transactionQuantity,
        });
      } else if (transactionQuantity > matchingOrder.quantity) {
        // If the seller's unit is more than the buyer's unit, update the buyer's order status and quantity
        await this.orderService.update(newOrder.order_id, {
          status: OrderStatus.PARTIAL,
          quantity: newOrder.quantity - transactionQuantity,
        });
      }
    }
  }
  
}

/**
 * The order should have user information -- done
 *
 * Fix the swagger create order -- done
 *
 * We need to add endpoint to fetch the order's based on the user Id and date(optional) -- done
 *
 * The transactions should have user information as well -- done
 *
 * Break down the logic based on the scenarios --
 *
 */
