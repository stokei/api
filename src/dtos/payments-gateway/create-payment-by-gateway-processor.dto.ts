import { IBaseService } from '@stokei/nestjs';

import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { AccountModel } from '@/models/account.model';
import { AppModel } from '@/models/app.model';
import { CheckoutModel } from '@/models/checkout.model';
import { CouponModel } from '@/models/coupon.model';
import { CurrencyModel } from '@/models/currency.model';
import { PaymentModel } from '@/models/payment.model';

export interface CreatePaymentByPaymentProcessorItem {
  id: string;
  name: string;
  imageURL?: string;
  amount: number;
  quantity: number;
}
export interface CreatePaymentByPaymentProcessorDTO {
  installments: number;
  successURL: string;
  cancelURL: string;
  paymentGatewayType: PaymentGatewayType;
  payer: AccountModel;
  currency: CurrencyModel;
  coupon?: CouponModel;
  payment: PaymentModel;
  items: CreatePaymentByPaymentProcessorItem[];
  app: AppModel;
  createdBy: string;
}

export type IBaseServiceCreatePaymentByPaymentProcessor = IBaseService<
  CreatePaymentByPaymentProcessorDTO,
  Promise<CheckoutModel>
>;
