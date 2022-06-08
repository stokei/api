import { PaymentsMethodModel } from '@/models/payments-method.model';

interface IDataPaymentsMethodRemovedEvent {
  readonly paymentsMethod: PaymentsMethodModel;
}

export class PaymentsMethodRemovedEvent {
  readonly paymentsMethod: PaymentsMethodModel;

  constructor(data: IDataPaymentsMethodRemovedEvent) {
    this.paymentsMethod = data.paymentsMethod;
  }
}
