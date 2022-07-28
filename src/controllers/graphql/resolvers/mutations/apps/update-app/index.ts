import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateAppInput } from '@/controllers/graphql/inputs/apps/update-app.input';
import { App } from '@/controllers/graphql/types/app';
import { UpdateAppService } from '@/services/apps/update-app';

@Resolver(() => App)
export class UpdateAppResolver {
  constructor(private readonly updateAppService: UpdateAppService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => App)
  async updateApp(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: UpdateAppInput
  ) {
    const response = await this.updateAppService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
