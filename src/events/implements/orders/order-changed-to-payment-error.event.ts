import { OrderModel } from '@/models/order.model';

interface IDataOrderChangedToPaymentErrorEvent {
  readonly updatedBy: string;
  readonly order: OrderModel;
}

export class OrderChangedToPaymentErrorEvent {
  readonly updatedBy: string;
  readonly order: OrderModel;

  constructor(data: IDataOrderChangedToPaymentErrorEvent) {
    this.updatedBy = data.updatedBy;
    this.order = data.order;
  }
}
