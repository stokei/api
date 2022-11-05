import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { AppAdmin } from '@/controllers/graphql/types/app-admin';
import { AppAdminModel } from '@/models/app-admin.model';

@Resolver(() => AppAdmin)
export class AppAdminUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() appAdmin: AppAdminModel) {
    return (
      appAdmin.updatedBy &&
      this.accountsLoader.findByIds.load(appAdmin.updatedBy)
    );
  }
}
