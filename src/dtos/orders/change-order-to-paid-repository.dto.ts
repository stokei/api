import { OrderStatus } from '@/enums/order-status.enum';

export interface ChangeOrderToPaidRepositoryDataDTO {
  status: OrderStatus;
  active: boolean;
  paidAmount: number;
  feeAmount: number;
  paidAt: string;
  updatedBy: string;
}

export interface ChangeOrderToPaidRepositoryWhereDTO {
  app: string;
  order: string;
}

export interface ChangeOrderToPaidRepositoryDTO {
  data: ChangeOrderToPaidRepositoryDataDTO;
  where: ChangeOrderToPaidRepositoryWhereDTO;
}
