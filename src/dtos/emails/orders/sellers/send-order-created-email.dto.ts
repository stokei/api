import { OrderModel } from '@/models/order.model';

export interface SendOrdersSellersOrderCreatedEmailDTO {
  order: OrderModel;
  app: string;
  createdBy: string;
}
