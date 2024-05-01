import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderType, OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  // User ID must be a UUID
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique identifier for the user' })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  // Order type must be one of the defined OrderType enums
  @ApiProperty({ enum: OrderType, example: OrderType.BUY, description: 'Type of the order (BUY or SELL)' })
  @IsEnum(OrderType)
  @IsNotEmpty()
  order_type: OrderType;

  // Unit price must be a number and cannot be empty
  @ApiProperty({ example: 100.50, description: 'Unit price of the order' })
  @IsNumber()
  @IsNotEmpty()
  unit_price: number;

  // Quantity must be a number and cannot be empty
  @ApiProperty({ example: 5, description: 'Quantity of items in the order' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  // Status must be one of the defined OrderStatus enums
  @ApiProperty({ enum: OrderStatus, example: OrderStatus.OPEN, description: 'Current status of the order (OPEN, PARTIAL, COMPLETED)' })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  // Optional: Buy order ID must be a UUID if provided
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', description: 'UUID of the associated buy order' })
  @IsOptional()
  @IsUUID()
  buy_order_id?: string;

  // Optional: Sell order ID must be a UUID if provided
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', description: 'UUID of the associated sell order' })
  @IsOptional()
  @IsUUID()
  sell_order_id?: string;
}
