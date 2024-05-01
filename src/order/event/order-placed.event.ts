import { OrderType } from "../entities/order.entity";

export class OrderPlacedEvent {
  constructor(
    public orderId: string,
    public userId: string,
    public orderType: OrderType,
  ) {}
}
