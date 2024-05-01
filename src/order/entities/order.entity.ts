import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';

// Enum for the type of order (BUY or SELL)
export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL',
}

// Enum for the status of an order (OPEN, PARTIAL, COMPLETED)
export enum OrderStatus {
  OPEN = 'OPEN',
  PARTIAL = 'PARTIAL',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Order {
  // Unique identifier for the order
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  // Relationship with the User entity
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Transactions associated with buying this order
  @OneToMany(() => Transaction, (transaction) => transaction.buy_order)
  buy_transactions: Transaction[];

  // Transactions associated with selling this order
  @OneToMany(() => Transaction, (transaction) => transaction.sell_order)
  sell_transactions: Transaction[];

  // The type of the order (BUY or SELL)
  @Column({ type: 'enum', enum: OrderType })
  order_type: OrderType;

  // The unit price of the order
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  // The quantity of items in the order
  @Column({ type: 'int' })
  quantity: number;

  // The current status of the order (OPEN, PARTIAL, COMPLETED)
  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  // Timestamp when the order was created
  @CreateDateColumn()
  created_at: Date;
}
