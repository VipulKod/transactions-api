import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private orderRepository: OrderService,
  ) {}

  // Fetches all transactions from the repository, including related buy and sell orders
  async findAll(): Promise<any> {
    const transactions = await this.transactionRepository.find({
      relations: [
        'buy_order',
        'sell_order',
        'buy_order.user',
        'sell_order.user',
      ],
    });

    return transactions.map((transaction) => ({
      ...transaction,
      buy_order: {
        order_id: transaction.buy_order.order_id,
        status: transaction.buy_order.status,
        user: transaction.buy_order.user.user_id,
      },
      sell_order: {
        order_id: transaction.sell_order.order_id,
        status: transaction.sell_order.status,
        user: transaction.sell_order.user.user_id,
      },
    }));
  }

  // Finds a single transaction by its ID
  async findOne(transaction_id: string): Promise<Transaction> {
    return await this.transactionRepository.findOne({
      where: {
        transaction_id: transaction_id,
      },
      relations: [
        'buy_order',
        'sell_order',
        'buy_order.user',
        'sell_order.user',
      ],
    });
  }

  // Creates a new transaction between a buy order and a sell order
  async createTransaction(
    buyOrderId: string,
    sellOrderId: string,
    unitPrice: number,
    quantity: number,
  ): Promise<Transaction> {
    // Fetches the buy and sell orders from the order repository
    const buyOrder = await this.orderRepository.findOne(buyOrderId);
    const sellOrder = await this.orderRepository.findOne(sellOrderId);

    // Checks if both orders exist
    if (!buyOrder || !sellOrder) {
      throw new Error('Buy or sell order not found');
    }

    // Creates a new transaction with the fetched orders and the provided details
    const transaction = this.transactionRepository.create({
      buy_order: buyOrder,
      sell_order: sellOrder,
      unit_price: unitPrice,
      quantity: quantity,
    });

    // Saves the transaction to the repository
    return await this.transactionRepository.save(transaction);
  }
}
