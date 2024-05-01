import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';

/**
 * Controller for handling transactions.
 */
@ApiTags('transactions')
@Controller('api/v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  /**
   * Retrieves all transactions.
   * @returns A promise that resolves to an array of Transaction entities.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all transactions' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all transactions.',
  })
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  /**
   * Retrieves a single transaction by its ID.
   * @param transactionId The ID of the transaction to retrieve.
   * @returns A promise that resolves to a Transaction entity.
   */
  @Get(':transaction_id')
  @ApiOperation({ summary: 'Retrieve a single transaction by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the transaction.',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  async findOne(@Param('transaction_id') transactionId: string): Promise<Transaction> {
    return this.transactionService.findOne(transactionId);
  }
}
