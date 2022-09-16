import { AggregateRoot } from '@nestjs/cqrs';

import { SubscriptionContractModel } from './subscription-contract.model';

export interface ICheckoutModelData {
  readonly subscriptionContract: SubscriptionContractModel;
  readonly clientSecret: string;
}

export class CheckoutModel extends AggregateRoot {
  readonly subscriptionContract: SubscriptionContractModel;
  readonly clientSecret: string;

  constructor(data: ICheckoutModelData) {
    super();

    this.subscriptionContract = data.subscriptionContract;
    this.clientSecret = data.clientSecret;
  }
}
