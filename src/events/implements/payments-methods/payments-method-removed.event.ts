import { PaymentsMethodModel } from '@/models/payments-method.model';

interface IDataPaymentsMethodRemovedEvent {
  readonly removedBy: string;
  readonly paymentsMethod: PaymentsMethodModel;
}

export class PaymentsMethodRemovedEvent {
  readonly removedBy: string;
  readonly paymentsMethod: PaymentsMethodModel;

  constructor(data: IDataPaymentsMethodRemovedEvent) {
    this.removedBy = data.removedBy;
    this.paymentsMethod = data.paymentsMethod;
  }
}
