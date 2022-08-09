import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Access } from '@/controllers/graphql/types/access';
import { Account } from '@/controllers/graphql/types/account';
import { AccessModel } from '@/models/access.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Access)
export class AccessCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() access: AccessModel) {
    return this.findAccountByIdService.execute(access.createdBy);
  }
}
