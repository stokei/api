import { PaymentModel } from '@/models/payment.model';

interface IDataPaymentCreatedEvent {
  readonly createdBy: string;
  readonly payment: PaymentModel;
}

export class PaymentCreatedEvent {
  readonly createdBy: string;
  readonly payment: PaymentModel;

  constructor(data: IDataPaymentCreatedEvent) {
    this.createdBy = data.createdBy;
    this.payment = data.payment;
  }
}
