import { PaymentsMethodModel } from '@/models/payments-method.model';

interface IDataPaymentsMethodCreatedEvent {
  readonly createdBy: string;
  readonly paymentsMethod: PaymentsMethodModel;
}

export class PaymentsMethodCreatedEvent {
  readonly createdBy: string;
  readonly paymentsMethod: PaymentsMethodModel;

  constructor(data: IDataPaymentsMethodCreatedEvent) {
    this.createdBy = data.createdBy;
    this.paymentsMethod = data.paymentsMethod;
  }
}
