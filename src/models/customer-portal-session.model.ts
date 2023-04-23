import { AggregateRoot } from '@nestjs/cqrs';

export interface ICustomerPortalSessionModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly url: string;
}

export class CustomerPortalSessionModel extends AggregateRoot {
  readonly id: string;
  readonly url: string;

  constructor(data: ICustomerPortalSessionModelData) {
    super();

    this.id = data._id?.toString() || data.id;
    this.url = data.url;
  }
}
