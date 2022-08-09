import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Module } from '@/controllers/graphql/types/module';
import { ModuleModel } from '@/models/module.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Module)
export class ModuleUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() module: ModuleModel) {
    return this.findAccountByIdService.execute(module.updatedBy);
  }
}
