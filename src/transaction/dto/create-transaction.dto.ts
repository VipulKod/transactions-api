import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a transaction.
 */
export class CreateTransactionDto {
  /**
   * UUID of the buy order involved in the transaction.
   */
  @IsUUID()
  buy_order_id: string;

  /**
   * UUID of the sell order involved in the transaction.
   */
  @IsUUID()
  sell_order_id: string;

  /**
   * Unit price of the transaction, must be a number and cannot be empty.
   */
  @IsNumber()
  @IsNotEmpty()
  unit_price: number;

  /**
   * Quantity of the transaction, must be a number and cannot be empty.
   */
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
