import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateAppAdminInput } from '@/controllers/graphql/inputs/app-admins/create-app-admin.input';
import { AppAdmin } from '@/controllers/graphql/types/app-admin';
import { CreateAppAdminService } from '@/services/app-admins/create-app-admin';

@Resolver(() => AppAdmin)
export class CreateAppAdminResolver {
  constructor(private readonly createAppAdminService: CreateAppAdminService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => AppAdmin)
  async createAppAdmin(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateAppAdminInput
  ) {
    const response = await this.createAppAdminService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
