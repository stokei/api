import { PaymentsMethodModel } from '@/models/payments-method.model';

interface IDataPaymentsMethodCreatedEvent {
  readonly paymentsMethod: PaymentsMethodModel;
}

export class PaymentsMethodCreatedEvent {
  readonly paymentsMethod: PaymentsMethodModel;

  constructor(data: IDataPaymentsMethodCreatedEvent) {
    this.paymentsMethod = data.paymentsMethod;
  }
}
