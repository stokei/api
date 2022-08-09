import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { Account } from '@/controllers/graphql/types/account';
import { App } from '@/controllers/graphql/types/app';
import { AccountModel } from '@/models/account.model';

@Resolver(() => Account)
export class AccountAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() account: AccountModel) {
    return account.app && this.appsLoader.findByIds.load(account.app);
  }
}
