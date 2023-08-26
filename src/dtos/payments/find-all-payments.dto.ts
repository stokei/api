import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { PaymentStatus } from '@/enums/payment-status.enum';

export interface WhereDataFindAllPaymentsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  payer?: IWhereDataSearch;
  currency?: IWhereData;
  status?: PaymentStatus;
  paymentMethod?: IWhereData;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPaymentsDTO =
  keyof WhereDataFindAllPaymentsDTO;

export interface OrderByDataFindAllPaymentsDTO {
  currency?: IOrderBy;
  status?: IOrderBy;
  paymentMethod?: IOrderBy;
  totalAmount?: IOrderBy;
  subtotalAmount?: IOrderBy;
  feeAmount?: IOrderBy;
  active?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPaymentsDTO =
  keyof OrderByDataFindAllPaymentsDTO;

export type FindAllPaymentsDTO = IBaseFindManyDTO<
  WhereDataFindAllPaymentsDTO,
  OrderByDataFindAllPaymentsDTO
>;
