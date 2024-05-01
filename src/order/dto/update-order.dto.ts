import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderType, OrderStatus } from '../entities/order.entity';

/**
 * Data Transfer Object (DTO) for updating an order.
 */
export class UpdateOrderDto {
  /**
   * Optional order type, either BUY or SELL.
   */
  @ApiProperty({ enum: OrderType, example: OrderType.BUY, description: 'Optional order type (BUY or SELL)' })
  @IsOptional()
  @IsEnum(OrderType)
  order_type?: OrderType;

  /**
   * Optional unit price of the order.
   */
  @ApiProperty({ example: 100.50, description: 'Optional unit price of the order' })
  @IsOptional()
  @IsNumber()
  unit_price?: number;

  /**
   * Optional quantity of the order.
   */
  @ApiProperty({ example: 5, description: 'Optional quantity of the order' })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  /**
   * Optional status of the order, such as OPEN, CLOSED, etc.
   */
  @ApiProperty({ enum: OrderStatus, example: OrderStatus.OPEN, description: 'Optional status of the order (OPEN, PARTIAL, COMPLETED)' })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  /**
   * Optional UUID of the associated buy order.
   */
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003', description: 'Optional UUID of the associated buy order' })
  @IsOptional()
  @IsUUID()
  buy_order_id?: string;

  /**
   * Optional UUID of the associated sell order.
   */
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174004', description: 'Optional UUID of the associated sell order' })
  @IsOptional()
  @IsUUID()
  sell_order_id?: string;
}
