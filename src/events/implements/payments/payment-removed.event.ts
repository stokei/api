import { PaymentModel } from '@/models/payment.model';

interface IDataPaymentRemovedEvent {
  readonly payment: PaymentModel;
}

export class PaymentRemovedEvent {
  readonly payment: PaymentModel;

  constructor(data: IDataPaymentRemovedEvent) {
    this.payment = data.payment;
  }
}
