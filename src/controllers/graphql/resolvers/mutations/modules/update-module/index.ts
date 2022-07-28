import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateModuleInput } from '@/controllers/graphql/inputs/modules/update-module.input';
import { Module } from '@/controllers/graphql/types/module';
import { UpdateModuleService } from '@/services/modules/update-module';

@Resolver(() => Module)
export class UpdateModuleResolver {
  constructor(private readonly updateModuleService: UpdateModuleService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Module)
  async updateModule(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: UpdateModuleInput
  ) {
    const response = await this.updateModuleService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
