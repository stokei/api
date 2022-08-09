import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { App } from '@/controllers/graphql/types/app';
import { AppModel } from '@/models/app.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => App)
export class AppUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() app: AppModel) {
    return this.findAccountByIdService.execute(app.updatedBy);
  }
}
