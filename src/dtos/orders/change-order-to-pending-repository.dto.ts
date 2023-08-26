import { OrderStatus } from '@/enums/order-status.enum';

export interface ChangeOrderToPendingRepositoryDataDTO {
  status: OrderStatus;
  active: boolean;
  updatedBy: string;
}

export interface ChangeOrderToPendingRepositoryWhereDTO {
  app: string;
  order: string;
}

export interface ChangeOrderToPendingRepositoryDTO {
  data: ChangeOrderToPendingRepositoryDataDTO;
  where: ChangeOrderToPendingRepositoryWhereDTO;
}
