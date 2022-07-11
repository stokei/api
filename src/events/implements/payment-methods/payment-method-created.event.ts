import { PaymentMethodModel } from '@/models/payment-method.model';

interface IDataPaymentMethodCreatedEvent {
  readonly createdBy: string;
  readonly paymentMethod: PaymentMethodModel;
}

export class PaymentMethodCreatedEvent {
  readonly createdBy: string;
  readonly paymentMethod: PaymentMethodModel;

  constructor(data: IDataPaymentMethodCreatedEvent) {
    this.createdBy = data.createdBy;
    this.paymentMethod = data.paymentMethod;
  }
}
