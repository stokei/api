import { PaymentModel } from '@/models/payment.model';

interface IDataPaymentUpdatedEvent {
  readonly payment: PaymentModel;
}

export class PaymentUpdatedEvent {
  readonly payment: PaymentModel;

  constructor(data: IDataPaymentUpdatedEvent) {
    this.payment = data.payment;
  }
}
