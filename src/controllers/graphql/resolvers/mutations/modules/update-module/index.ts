import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
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
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateModuleInput
  ) {
    const response = await this.updateModuleService.execute({
      where: {
        ...data?.where,
        app: appId
      },
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
