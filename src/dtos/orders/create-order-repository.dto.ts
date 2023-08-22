import { OrderStatus } from '@/enums/order-status.enum';

import { CreateOrderDTO } from './create-order.dto';

export interface CreateOrderRepositoryDTO
  extends Omit<CreateOrderDTO, 'items'> {
  status: OrderStatus;
  active: boolean;
  feeAmount: number;
  currency: string;
  paidAmount: number;
  totalAmount: number;
  subtotalAmount: number;
}
