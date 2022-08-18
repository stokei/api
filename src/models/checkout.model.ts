import { AggregateRoot } from '@nestjs/cqrs';

export interface ICheckoutModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly url: string;
}

export class CheckoutModel extends AggregateRoot {
  readonly id: string;
  readonly url: string;

  constructor(data: ICheckoutModelData) {
    super();

    this.id = data._id?.toString() || data.id;
    this.url = data.url;
  }
}
