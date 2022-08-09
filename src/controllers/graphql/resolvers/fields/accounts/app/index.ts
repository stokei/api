import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { App } from '@/controllers/graphql/types/app';
import { AccountModel } from '@/models/account.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Account)
export class AccountAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() account: AccountModel) {
    return this.findAppByIdService.execute(account.app);
  }
}
