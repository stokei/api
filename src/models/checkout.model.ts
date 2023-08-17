import { AggregateRoot } from '@nestjs/cqrs';

export interface CheckoutPixData {
  readonly qrCodeURL: string;
  readonly copyAndPaste: string;
}

export interface ICheckoutModelData {
  readonly order: string;
  readonly url?: string;
  readonly pix?: CheckoutPixData;
}

export class CheckoutModel extends AggregateRoot {
  readonly order: string;
  readonly url?: string;
  readonly pix?: CheckoutPixData;

  constructor(data: ICheckoutModelData) {
    super();

    this.url = data.url;
    this.order = data.order;
    this.pix = data.pix;
  }
}
