import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';

export interface WhereDataFindAllOrderItemsDTO {
  ids?: string[];
  app?: IWhereData;
  name?: IWhereDataSearch;
  order?: IWhereData;
  product?: IWhereData;
  description?: IWhereDataSearch;
  type?: PriceType;
  recurringIntervalCount?: IWhereData<number>;
  recurringIntervalType?: RecurringType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllOrderItemsDTO =
  keyof WhereDataFindAllOrderItemsDTO;

export interface OrderByDataFindAllOrderItemsDTO {
  name?: IOrderBy;
  type?: IOrderBy;
  quantity?: IOrderBy;
  recurringIntervalCount?: IOrderBy;
  recurringIntervalType?: IOrderBy;
  amount?: IOrderBy;
  fromAmount?: IOrderBy;
  toAmount?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllOrderItemsDTO =
  keyof OrderByDataFindAllOrderItemsDTO;

export type FindAllOrderItemsDTO = IBaseFindManyDTO<
  WhereDataFindAllOrderItemsDTO,
  OrderByDataFindAllOrderItemsDTO
>;
