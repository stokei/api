import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

import { OrderStatus } from '@/enums/order-status.enum';

export interface WhereDataFindAllOrdersDTO {
  ids?: string[];
  app?: IWhereData;
  cart?: IWhereData;
  customer?: IWhereData;
  currency?: IWhereData;
  status?: OrderStatus;
  oldStatus?: OrderStatus;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllOrdersDTO = keyof WhereDataFindAllOrdersDTO;

export interface OrderByDataFindAllOrdersDTO {
  applicationFeePercentage?: IOrderBy;
  applicationFeeAmount?: IOrderBy;
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
