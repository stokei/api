import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { App } from '@/controllers/graphql/types/app';
import { AppModel } from '@/models/app.model';

@Resolver(() => App)
export class AppUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() app: AppModel) {
    return app.updatedBy && this.accountsLoader.findByIds.load(app.updatedBy);
  }
}
