import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseFilters,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('api/v1/orders')
@UseFilters(new HttpExceptionFilter())
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Create a new order
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateOrderDto }) // Document the request body
  async create(@Body() order: Partial<Order>): Promise<Order> {
    return this.orderService.create(order);
  }

  // Retrieve all orders
  @Get('')
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all orders.',
  })
  async all(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  // Retrieve a single order by ID
  @Get(':order_id')
  @ApiOperation({ summary: 'Retrieve a single order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the order.',
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async findOne(@Param('order_id') orderId: string): Promise<Order> {
    const order = await this.orderService.findOne(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }
    return order;
  }

  @Get('/by-user/:userId')
  @ApiOperation({ summary: 'Fetch orders by user ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched orders for the specified user.',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Optional date filter',
  })
  async findOrdersByUserId(
    @Param('userId') userId: string,
    @Query('date') date?: string,
  ): Promise<Order[]> {
    return this.orderService.findOrdersByUserIdAndDate(
      userId,
      date ? new Date(date) : undefined,
    );
  }

  // Update an existing order by ID
  @Put(':order_id')
  @ApiOperation({ summary: 'Update an existing order by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated the order.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async update(
    @Param('order_id') orderId: string,
    @Body() order: Partial<Order>,
  ): Promise<Order> {
    const updatedOrder = await this.orderService.update(orderId, order);
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }
    return updatedOrder;
  }

  // Delete an order by ID
  @Delete(':order_id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({ status: 204, description: 'Successfully deleted the order.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async delete(@Param('order_id') orderId: string): Promise<void> {
    return await this.orderService.delete(orderId);
  }
}
