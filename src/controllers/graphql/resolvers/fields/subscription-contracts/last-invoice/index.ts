import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Invoice } from '@/controllers/graphql/types/invoice';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindSubscriptionContractLastInvoiceService } from '@/services/subscription-contracts/find-subscription-contract-last-invoice';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractLastInvoiceResolver {
  constructor(
    private readonly findSubscriptionContractLastInvoiceService: FindSubscriptionContractLastInvoiceService
  ) {}

  @ResolveField(() => Invoice, { nullable: true })
  lastInvoice(@Parent() subscriptionContract: SubscriptionContractModel) {
    return this.findSubscriptionContractLastInvoiceService.execute(
      subscriptionContract.id
    );
  }
}
