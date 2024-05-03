import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';

/**
 * Controller for handling transactions.
 */
@Controller('api/v1/transactions')
export class TransactionController {
  /**
   * Constructor to inject the TransactionService.
   */
  constructor(private readonly transactionService: TransactionService) {}

  /**
   * Retrieves all transactions.
   * @returns A promise that resolves to an array of Transaction entities.
   */
  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  /**
   * Retrieves a single transaction by its ID.
   * @param transactionId The ID of the transaction to retrieve.
   * @returns A promise that resolves to a Transaction entity.
   */
  @Get(':transaction_id')
  async findOne(@Param('transaction_id') transactionId: string): Promise<Transaction> {
    return this.transactionService.findOne(transactionId);
  }
}
