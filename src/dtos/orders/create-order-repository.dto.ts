import { OrderStatus } from '@/enums/order-status.enum';

import { CreateOrderDTO } from './create-order.dto';

export interface CreateOrderRepositoryDTO extends CreateOrderDTO {
  status: OrderStatus;
  active: boolean;
  feeAmount: number;
}
