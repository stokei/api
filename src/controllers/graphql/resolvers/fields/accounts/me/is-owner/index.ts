import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { AccountModel } from '@/models/account.model';

@Resolver(() => MeAccount)
export class MeAccountIsOwnerResolver {
  @UseGuards(AppGuard)
  @ResolveField(() => Boolean, { nullable: true })
  async isOwner(
    @Parent() account: AccountModel,
    @CurrentApp('parent') appParent: string
  ) {
    return account.id === appParent;
  }
}
