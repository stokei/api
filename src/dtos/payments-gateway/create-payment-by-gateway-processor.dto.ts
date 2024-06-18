import { IBaseService } from '@stokei/nestjs';

import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';
import { AccountModel } from '@/models/account.model';
import { AppModel } from '@/models/app.model';
import { CheckoutModel } from '@/models/checkout.model';
import { CurrencyModel } from '@/models/currency.model';
import { PaymentModel } from '@/models/payment.model';

export interface CreatePaymentByPaymentProcessorDTO {
  successURL: string;
  cancelURL: string;
  paymentGatewayType: PaymentGatewayType;
  payer: AccountModel;
  currency: CurrencyModel;
  payment: PaymentModel;
  paymentMethodType: PaymentMethodType;
  app: AppModel;
  createdBy: string;
}

export type IBaseServiceCreatePaymentByPaymentProcessor = IBaseService<
  CreatePaymentByPaymentProcessorDTO,
  Promise<CheckoutModel>
>;
