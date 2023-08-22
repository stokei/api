import { OrderStatus } from '@/enums/order-status.enum';

export interface ChangeOrderToPaymentErrorRepositoryDataDTO {
  status: OrderStatus;
  active: boolean;
  paymentErrorAt: string;
  updatedBy: string;
}

export interface ChangeOrderToPaymentErrorRepositoryWhereDTO {
  app: string;
  order: string;
}

export interface ChangeOrderToPaymentErrorRepositoryDTO {
  data: ChangeOrderToPaymentErrorRepositoryDataDTO;
  where: ChangeOrderToPaymentErrorRepositoryWhereDTO;
}
