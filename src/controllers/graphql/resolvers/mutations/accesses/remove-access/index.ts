import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveAccessInput } from '@/controllers/graphql/inputs/accesses/remove-access.input';
import { Access } from '@/controllers/graphql/types/access';
import { RemoveAccessService } from '@/services/accesses/remove-access';

@Resolver(() => Access)
export class RemoveAccessResolver {
  constructor(private readonly removeAccessService: RemoveAccessService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Access)
  async removeAccess(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveAccessInput
  ) {
    const response = await this.removeAccessService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        account: currentAccountId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
