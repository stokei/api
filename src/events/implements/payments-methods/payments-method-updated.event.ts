import { PaymentsMethodModel } from '@/models/payments-method.model';

interface IDataPaymentsMethodUpdatedEvent {
  readonly paymentsMethod: PaymentsMethodModel;
}

export class PaymentsMethodUpdatedEvent {
  readonly paymentsMethod: PaymentsMethodModel;

  constructor(data: IDataPaymentsMethodUpdatedEvent) {
    this.paymentsMethod = data.paymentsMethod;
  }
}
