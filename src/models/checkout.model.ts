import { AggregateRoot } from '@nestjs/cqrs';

export interface CheckoutPixData {
  readonly qrCodeURL: string;
  readonly copyAndPaste: string;
}

export interface CheckoutBoletoData {
  readonly line: string;
  readonly pdf: string;
  readonly barcode: string;
}

export interface CheckoutCardData {
  readonly brand: string;
  readonly lastFourNumber: string;
  readonly expiryMonth: string;
  readonly expiryYear: string;
}

export interface ICheckoutModelData {
  readonly payment: string;
  readonly url?: string;
  readonly boleto?: CheckoutBoletoData;
  readonly card?: CheckoutCardData;
  readonly pix?: CheckoutPixData;
}

export class CheckoutModel extends AggregateRoot {
  readonly payment: string;
  readonly url?: string;
  readonly boleto?: CheckoutBoletoData;
  readonly card?: CheckoutCardData;
  readonly pix?: CheckoutPixData;

  constructor(data: ICheckoutModelData) {
    super();

    this.url = data.url;
    this.payment = data.payment;
    this.boleto = data.boleto;
    this.card = data.card;
    this.pix = data.pix;
  }
}
