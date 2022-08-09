import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Domain } from '@/controllers/graphql/types/domain';
import { DomainModel } from '@/models/domain.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Domain)
export class DomainUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() domain: DomainModel) {
    return this.findAccountByIdService.execute(domain.updatedBy);
  }
}
