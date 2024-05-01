import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for creating a transaction.
 */
export class CreateTransactionDto {
  /**
   * UUID of the buy order involved in the transaction.
   */
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'UUID of the buy order involved in the transaction' })
  @IsUUID()
  buy_order_id: string;

  /**
   * UUID of the sell order involved in the transaction.
   */
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', description: 'UUID of the sell order involved in the transaction' })
  @IsUUID()
  sell_order_id: string;

  /**
   * Unit price of the transaction, must be a number and cannot be empty.
   */
  @ApiProperty({ example: 100.50, description: 'Unit price of the transaction' })
  @IsNumber()
  @IsNotEmpty()
  unit_price: number;

  /**
   * Quantity of the transaction, must be a number and cannot be empty.
   */
  @ApiProperty({ example: 5, description: 'Quantity of the transaction' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
