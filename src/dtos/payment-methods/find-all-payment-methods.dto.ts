import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

import { PaymentMethodProvider } from '@/enums/payment-method-provider.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface WhereDataFindAllPaymentMethodsDTO {
  ids?: string[];
  parent?: IWhereData;
  type?: PaymentMethodType;
  provider?: PaymentMethodProvider;
  externalPaymentMethod?: IWhereData<string>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPaymentMethodsDTO =
  keyof WhereDataFindAllPaymentMethodsDTO;

export interface OrderByDataFindAllPaymentMethodsDTO {
  type?: IOrderBy;
  provider?: IOrderBy;
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
