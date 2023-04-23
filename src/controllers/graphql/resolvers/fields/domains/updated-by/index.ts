import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Domain } from '@/controllers/graphql/types/domain';
import { DomainModel } from '@/models/domain.model';

@Resolver(() => Domain)
export class DomainUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() domain: DomainModel) {
    return (
      domain.updatedBy && this.accountsLoader.findByIds.load(domain.updatedBy)
    );
  }
}
