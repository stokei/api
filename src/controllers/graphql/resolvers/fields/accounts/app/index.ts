import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { AccountModel } from '@/models/account.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Account)
export class AccountAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => Account)
  app(@Parent() account: AccountModel) {
    return this.findAppByIdService.execute(account.app);
  }
}
