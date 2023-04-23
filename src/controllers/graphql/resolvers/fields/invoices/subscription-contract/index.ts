import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { SubscriptionContractsLoader } from '@/controllers/graphql/dataloaders/subscription-contracts.loader';
import { Invoice } from '@/controllers/graphql/types/invoice';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { InvoiceModel } from '@/models/invoice.model';

@Resolver(() => Invoice)
export class InvoiceSubscriptionContractResolver {
  constructor(
    private readonly subscriptionContractsLoader: SubscriptionContractsLoader
  ) {}

  @ResolveField(() => SubscriptionContract, { nullable: true })
  subscriptionContract(@Parent() invoice: InvoiceModel) {
    return (
      invoice.subscription &&
      this.subscriptionContractsLoader.findByIds.load(invoice.subscription)
    );
  }
}
