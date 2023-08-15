import { PaymentModel } from '@/models/payment.model';

interface IDataPaymentRemovedEvent {
  readonly removedBy: string;
  readonly payment: PaymentModel;
}

export class PaymentRemovedEvent {
  readonly removedBy: string;
  readonly payment: PaymentModel;

  constructor(data: IDataPaymentRemovedEvent) {
    this.removedBy = data.removedBy;
    this.payment = data.payment;
  }
}
