import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { PaymentMethodProvider } from '@/enums/payment-method-provider.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface CountPaymentMethodsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  cardBrand?: IWhereData<string>;
  type?: PaymentMethodType;
  provider?: PaymentMethodProvider;
  stripePaymentMethod?: IWhereData<string>;
  active?: IWhereData<boolean>;
}
export type IKeysCountPaymentMethodsWhereDTO =
  keyof CountPaymentMethodsWhereDTO;

export type CountPaymentMethodsDTO = IBaseCountDTO<CountPaymentMethodsWhereDTO>;
