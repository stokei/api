import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Domain } from '@/controllers/graphql/types/domain';
import { DomainModel } from '@/models/domain.model';

@Resolver(() => Domain)
export class DomainCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() domain: DomainModel) {
    return (
      domain.createdBy && this.accountsLoader.findByIds.load(domain.createdBy)
    );
  }
}
