import { PaymentMethodType } from '@/enums/payment-method-type.enum';
import { AppModel } from '@/models/app.model';
export interface CreatePagarmeOrderPriceDTO {
  id: string;
  name: string;
  amount: number;
  quantity: number;
}

export interface CreatePagarmeOrderDTO {
  payment: string;
  installments: number;
  app: AppModel;
  appRecipient: string;
  totalAmount: number;
  feeAmount: number;
  customer: string;
  card?: string;
  paymentMethodType: PaymentMethodType;
  currency: string;
  prices: CreatePagarmeOrderPriceDTO[];
}
