import { PaymentModel } from '@/models/payment.model';

interface IDataPaymentChangedToPaymentErrorEvent {
  readonly updatedBy: string;
  readonly payment: PaymentModel;
}

export class PaymentChangedToPaymentErrorEvent {
  readonly updatedBy: string;
  readonly payment: PaymentModel;

  constructor(data: IDataPaymentChangedToPaymentErrorEvent) {
    this.updatedBy = data.updatedBy;
    this.payment = data.payment;
  }
}
