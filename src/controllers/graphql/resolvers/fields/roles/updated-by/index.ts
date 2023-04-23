import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Role } from '@/controllers/graphql/types/role';
import { RoleModel } from '@/models/role.model';

@Resolver(() => Role)
export class RoleUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() role: RoleModel) {
    return role.updatedBy && this.accountsLoader.findByIds.load(role.updatedBy);
  }
}
