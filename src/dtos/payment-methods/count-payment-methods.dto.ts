import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

import { PaymentMethodProvider } from '@/enums/payment-method-provider.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface CountPaymentMethodsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  type?: IWhereData<PaymentMethodType>;
  provider?: IWhereData<PaymentMethodProvider>;
  externalPaymentMethodId?: IWhereData<string>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPaymentMethodsWhereDTO =
  keyof CountPaymentMethodsWhereDTO;

export type CountPaymentMethodsDTO = IBaseCountDTO<CountPaymentMethodsWhereDTO>;
