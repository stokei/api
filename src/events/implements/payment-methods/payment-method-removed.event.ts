import { PaymentMethodModel } from '@/models/payment-method.model';

interface IDataPaymentMethodRemovedEvent {
  readonly removedBy: string;
  readonly paymentMethod: PaymentMethodModel;
}

export class PaymentMethodRemovedEvent {
  readonly removedBy: string;
  readonly paymentMethod: PaymentMethodModel;

  constructor(data: IDataPaymentMethodRemovedEvent) {
    this.removedBy = data.removedBy;
    this.paymentMethod = data.paymentMethod;
  }
}
