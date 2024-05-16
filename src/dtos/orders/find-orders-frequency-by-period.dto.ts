import { OrderStatus } from '@/enums/order-status.enum';

export interface FindOrdersFrequencyByPeriodDTO {
  status: OrderStatus;
  app: string;
  startAt: string;
  endAt: string;
}
