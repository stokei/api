import { PaymentModel } from '@/models/payment.model';

interface IDataPaymentCreatedEvent {
  readonly payment: PaymentModel;
}

export class PaymentCreatedEvent {
  readonly payment: PaymentModel;

  constructor(data: IDataPaymentCreatedEvent) {
    this.payment = data.payment;
  }
}
