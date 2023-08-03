import { AggregateRoot } from '@nestjs/cqrs';

export interface IPixCheckoutModelData {
  readonly qrCodeURL: string;
}

export class PixCheckoutModel extends AggregateRoot {
  readonly qrCodeURL: string;

  constructor(data: IPixCheckoutModelData) {
    super();

    this.qrCodeURL = data.qrCodeURL;
  }
}
