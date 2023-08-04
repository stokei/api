import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface WhereDataFindAllPaymentMethodsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  cardBrand?: IWhereData<string>;
  active?: IWhereData<boolean>;
  paymentMethodType?: PaymentMethodType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPaymentMethodsDTO =
  keyof WhereDataFindAllPaymentMethodsDTO;

export interface OrderByDataFindAllPaymentMethodsDTO {
  cardBrand?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPaymentMethodsDTO =
  keyof OrderByDataFindAllPaymentMethodsDTO;

export type FindAllPaymentMethodsDTO = IBaseFindManyDTO<
  WhereDataFindAllPaymentMethodsDTO,
  OrderByDataFindAllPaymentMethodsDTO
>;
