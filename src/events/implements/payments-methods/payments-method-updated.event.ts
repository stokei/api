import { PaymentsMethodModel } from '@/models/payments-method.model';

interface IDataPaymentsMethodUpdatedEvent {
  readonly updatedBy: string;
  readonly paymentsMethod: PaymentsMethodModel;
}

export class PaymentsMethodUpdatedEvent {
  readonly updatedBy: string;
  readonly paymentsMethod: PaymentsMethodModel;

  constructor(data: IDataPaymentsMethodUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.paymentsMethod = data.paymentsMethod;
  }
}
