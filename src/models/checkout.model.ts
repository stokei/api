import { AggregateRoot } from '@nestjs/cqrs';

export interface CheckoutPixData {
  readonly qrCodeURL: string;
  readonly copyAndPaste: string;
}

export interface ICheckoutModelData {
  readonly payment: string;
  readonly url?: string;
  readonly pix?: CheckoutPixData;
}

export class CheckoutModel extends AggregateRoot {
  readonly payment: string;
  readonly url?: string;
  readonly pix?: CheckoutPixData;

  constructor(data: ICheckoutModelData) {
    super();

    this.url = data.url;
    this.payment = data.payment;
    this.pix = data.pix;
  }
}
