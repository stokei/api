import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface CountPaymentMethodsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  cardBrand?: IWhereData<string>;
  paymentMethodType?: PaymentMethodType;
  stripePaymentMethod?: IWhereData<string>;
  active?: IWhereData<boolean>;
}
export type IKeysCountPaymentMethodsWhereDTO =
  keyof CountPaymentMethodsWhereDTO;

export type CountPaymentMethodsDTO = IBaseCountDTO<CountPaymentMethodsWhereDTO>;
