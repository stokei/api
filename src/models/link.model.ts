import { AggregateRoot } from '@nestjs/cqrs';

export interface ILinkModelData {
  readonly url: string;
}

export class LinkModel extends AggregateRoot {
  readonly url: string;

  constructor(data: ILinkModelData) {
    super();

    this.url = data.url;
  }
}
