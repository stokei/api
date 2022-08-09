import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Plan } from '@/controllers/graphql/types/plan';
import { PlanModel } from '@/models/plan.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Plan)
export class PlanCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() plan: PlanModel) {
    return this.findAccountByIdService.execute(plan.createdBy);
  }
}
