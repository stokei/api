import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Plan } from '@/controllers/graphql/types/plan';
import { PlanModel } from '@/models/plan.model';

@Resolver(() => Plan)
export class PlanUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() plan: PlanModel) {
    return plan.updatedBy && this.accountsLoader.findByIds.load(plan.updatedBy);
  }
}
