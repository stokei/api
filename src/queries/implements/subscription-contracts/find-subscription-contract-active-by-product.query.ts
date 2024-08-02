import { IQuery } from '@nestjs/cqrs';

import { FindSubscriptionContractActiveByProductDTO } from '@/dtos/subscription-contracts/find-subscription-contract-active-by-product.dto';

export class FindSubscriptionContractActiveByProductQuery
  implements IQuery, FindSubscriptionContractActiveByProductDTO
{
  customer: string;
  product: string;
  app: string;

  constructor(data: FindSubscriptionContractActiveByProductDTO) {
    this.customer = data.customer;
    this.product = data.product;
    this.app = data.app;
  }
}
