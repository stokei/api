import { AccountModel } from '@/models/account.model';
import { AppModel } from '@/models/app.model';
import { OrderModel } from '@/models/order.model';
import { PaymentModel } from '@/models/payment.model';

export interface CreateStripePaymentIntentDTO {
  app: AppModel;
  currency: string;
  feeAmount: number;
  customer: AccountModel;
  payment: PaymentModel;
  order: OrderModel;
}
