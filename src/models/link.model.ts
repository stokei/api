import { AggregateRoot } from '@nestjs/cqrs';

export interface ILinkModelData {
  readonly id?: string;
  readonly url: string;
}

export class LinkModel extends AggregateRoot {
  readonly id?: string;
  readonly url: string;

  constructor(data: ILinkModelData) {
    super();

    this.id = data.id;
    this.url = data.url;
  }
}
