import { OrderModel } from '@/models/order.model';

export interface SendOrderCreatedEmailDTO {
  toAccount: string;
  order: OrderModel;
  app: string;
  createdBy: string;
}
