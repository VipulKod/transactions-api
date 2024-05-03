import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';


@Entity()
export class Transaction {
  /**
   * Unique identifier for the transaction.
   */
  @PrimaryGeneratedColumn('uuid')
  transaction_id: string;

  /**
   * Reference to the Order entity that represents the buy order.
   */
  @ManyToOne(() => Order, (order) => order.buy_transactions)
  @JoinColumn({ name: 'buy_order_id' })
  buy_order: Order;

  /**
   * Reference to the Order entity that represents the sell order.
   */
  @ManyToOne(() => Order, (order) => order.sell_transactions)
  @JoinColumn({ name: 'sell_order_id' })
  sell_order: Order;

  /**
   * The unit price of the transaction.
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  /**
   * The quantity of items involved in the transaction.
   */
  @Column({ type: 'int' })
  quantity: number;

  /**
   * Timestamp when the transaction was created.
   */
  @CreateDateColumn()
  transaction_time: Date;
}
