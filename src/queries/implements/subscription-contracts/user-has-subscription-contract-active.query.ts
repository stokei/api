import { IQuery } from '@nestjs/cqrs';

import { UserHasSubscriptionContractActiveDTO } from '@/dtos/subscription-contracts/user-has-subscription-contract-active.dto';

export class UserHasSubscriptionContractActiveQuery
  implements IQuery, UserHasSubscriptionContractActiveDTO
{
  customer: string;
  product: string;
  price: string;
  app: string;

  constructor(data: UserHasSubscriptionContractActiveDTO) {
    this.customer = data.customer;
    this.product = data.product;
    this.price = data.price;
    this.app = data.app;
  }
}
