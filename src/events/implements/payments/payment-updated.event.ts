import { PaymentModel } from '@/models/payment.model';

interface IDataPaymentUpdatedEvent {
  readonly updatedBy: string;
  readonly payment: PaymentModel;
}

export class PaymentUpdatedEvent {
  readonly updatedBy: string;
  readonly payment: PaymentModel;

  constructor(data: IDataPaymentUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.payment = data.payment;
  }
}
