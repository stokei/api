import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Role } from '@/controllers/graphql/types/role';
import { RoleModel } from '@/models/role.model';

@Resolver(() => Role)
export class RoleCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() role: RoleModel) {
    return role.createdBy && this.accountsLoader.findByIds.load(role.createdBy);
  }
}
