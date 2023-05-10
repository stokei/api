import { AggregateRoot } from '@nestjs/cqrs';

export interface ICheckoutModelData {
  readonly url: string;
}

export class CheckoutModel extends AggregateRoot {
  readonly url: string;

  constructor(data: ICheckoutModelData) {
    super();

    this.url = data.url;
  }
}
