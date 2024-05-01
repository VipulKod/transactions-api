import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderMatchingService } from './order-matching/order-matching.service';
import { TransactionModule } from 'src/transaction/transaction.module';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [
    forwardRef(() => TransactionModule),
    TypeOrmModule.forFeature([Order]),
    EventEmitterModule.forRoot(),
    UserModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderMatchingService],
  exports: [OrderService]
})
export class OrderModule {}
