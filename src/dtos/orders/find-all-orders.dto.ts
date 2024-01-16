import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { OrderStatus } from '@/enums/order-status.enum';

export interface WhereDataFindAllOrdersDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  currency?: IWhereData;
  coupon?: IWhereData;
  status?: OrderStatus;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllOrdersDTO = keyof WhereDataFindAllOrdersDTO;

export interface OrderByDataFindAllOrdersDTO {
  currency?: IOrderBy;
  status?: IOrderBy;
  paidAmount?: IOrderBy;
  totalAmount?: IOrderBy;
  subtotalAmount?: IOrderBy;
  feeAmount?: IOrderBy;
  active?: IOrderBy;
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
