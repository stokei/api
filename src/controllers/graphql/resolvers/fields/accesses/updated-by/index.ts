import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Access } from '@/controllers/graphql/types/access';
import { Account } from '@/controllers/graphql/types/account';
import { AccessModel } from '@/models/access.model';

@Resolver(() => Access)
export class AccessUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() access: AccessModel) {
    return (
      access.updatedBy && this.accountsLoader.findByIds.load(access.updatedBy)
    );
  }
}
