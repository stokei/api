import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveModuleInput } from '@/controllers/graphql/inputs/modules/remove-module.input';
import { Module } from '@/controllers/graphql/types/module';
import { RemoveModuleService } from '@/services/modules/remove-module';

@Resolver(() => Module)
export class RemoveModuleResolver {
  constructor(private readonly removeModuleService: RemoveModuleService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Module)
  async removeModule(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: RemoveModuleInput
  ) {
    const response = await this.removeModuleService.execute({
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
