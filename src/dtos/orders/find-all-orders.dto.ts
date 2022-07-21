import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

import { OrderStatus } from '@/enums/order-status.enum';

export interface WhereDataFindAllOrdersDTO {
  ids?: string[];
  project?: IWhereData;
  cart?: IWhereData;
  customer?: IWhereData;
  currency?: IWhereData;
  status?: IWhereData<OrderStatus>;
  oldStatus?: IWhereData<OrderStatus>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllOrdersDTO = keyof WhereDataFindAllOrdersDTO;

export interface OrderByDataFindAllOrdersDTO {
  salesComissionPercentage?: IOrderBy;
  salesComissionAmount?: IOrderBy;
  currency?: IOrderBy;
  amount?: IOrderBy;
  discountAmount?: IOrderBy;
  subtotalAmount?: IOrderBy;
  totalAmount?: IOrderBy;
  status?: IOrderBy;
  oldStatus?: IOrderBy;
  active?: IOrderBy;
  paidAt?: IOrderBy;
  canceledAt?: IOrderBy;
  paymentErrorAt?: IOrderBy;
  totalRefundedAt?: IOrderBy;
  parcialRefundedAt?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllOrdersDTO =
  keyof OrderByDataFindAllOrdersDTO;

export type FindAllOrdersDTO = IBaseFindManyDTO<
  WhereDataFindAllOrdersDTO,
  OrderByDataFindAllOrdersDTO
>;
