import { IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionDto {
  /**
   * Optional unit price of the transaction.
   * Must be a number if provided.
   */
  @ApiProperty({
    example: 99.99,
    description: 'The unit price of the transaction.',
  })
  @IsOptional()
  @IsNumber()
  unit_price?: number;

  /**
   * Optional quantity of the transaction.
   * Must be a number if provided.
   */
  @ApiProperty({
    example: 5,
    description: 'The quantity of items involved in the transaction.',
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;
}
