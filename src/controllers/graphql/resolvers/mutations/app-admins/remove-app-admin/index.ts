import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveAppAdminInput } from '@/controllers/graphql/inputs/app-admins/remove-app-admin.input';
import { AppAdmin } from '@/controllers/graphql/types/app-admin';
import { RemoveAppAdminService } from '@/services/app-admins/remove-app-admin';

@Resolver(() => AppAdmin)
export class RemoveAppAdminResolver {
  constructor(private readonly removeAppAdminService: RemoveAppAdminService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => AppAdmin)
  async removeAppAdmin(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveAppAdminInput
  ) {
    const response = await this.removeAppAdminService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
