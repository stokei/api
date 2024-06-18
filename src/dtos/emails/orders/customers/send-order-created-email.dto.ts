import { OrderModel } from '@/models/order.model';

export interface SendOrdersCustomersOrderCreatedEmailDTO {
  toAccount: string;
  order: OrderModel;
  app: string;
  createdBy: string;
}
