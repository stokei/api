import { PaymentModel } from '@/models/payment.model';

interface IDataPaymentChangedToPaidEvent {
  readonly updatedBy: string;
  readonly payment: PaymentModel;
}

export class PaymentChangedToPaidEvent {
  readonly updatedBy: string;
  readonly payment: PaymentModel;

  constructor(data: IDataPaymentChangedToPaidEvent) {
    this.updatedBy = data.updatedBy;
    this.payment = data.payment;
  }
}
