import { PaymentMethodModel } from '@/models/payment-method.model';

interface IDataPaymentMethodUpdatedEvent {
  readonly updatedBy: string;
  readonly paymentMethod: PaymentMethodModel;
}

export class PaymentMethodUpdatedEvent {
  readonly updatedBy: string;
  readonly paymentMethod: PaymentMethodModel;

  constructor(data: IDataPaymentMethodUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.paymentMethod = data.paymentMethod;
  }
}
