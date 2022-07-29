import { OrderStatus } from '@/enums/order-status.enum';

import { CreateOrderDTO } from './create-order.dto';

export interface CreateOrderRepositoryDTO extends CreateOrderDTO {
  amount: number;
  discountAmount: number;
  subtotalAmount: number;
  totalAmount: number;
  applicationFeePercentage: number;
  applicationFeeAmount: number;
  currency: string;
  status: OrderStatus;
}
