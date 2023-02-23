import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { Account } from '@/controllers/graphql/types/account';
import { AccountModel } from '@/models/account.model';

@Resolver(() => Account)
export class AccountIsOwnerResolver {
  @UseGuards(AppGuard)
  @ResolveField(() => Boolean, { nullable: true })
  async isOwner(
    @Parent() account: AccountModel,
    @CurrentApp('parent') appParent: string
  ) {
    return account.id === appParent;
  }
}
