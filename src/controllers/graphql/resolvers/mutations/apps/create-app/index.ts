import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateAppInput } from '@/controllers/graphql/inputs/apps/create-app.input';
import { App } from '@/controllers/graphql/types/app';
import { CreateAppService } from '@/services/apps/create-app';

@Resolver(() => App)
export class CreateAppResolver {
  constructor(private readonly createAppService: CreateAppService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => App)
  async createApp(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateAppInput
  ) {
    const response = await this.createAppService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
