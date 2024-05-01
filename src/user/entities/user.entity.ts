import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  // Unique identifier for each user
  user_id: string;

  @OneToMany(() => Order, (order) => order.user)
  // A user can have multiple orders
  orders: Order[];

  @Column({ type: 'varchar', length: 15 })
  // Username of the user
  username: string;

  @Column({ type: 'varchar', length: 40 })
  // Email address of the user
  email: string;

  @Column({ type: 'enum', enum: ['buyer', 'seller'], default: 'buyer' })
  // User type, either 'buyer' or 'seller'
  user_type: string;
}
