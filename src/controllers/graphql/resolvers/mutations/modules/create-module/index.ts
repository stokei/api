import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateModuleInput } from '@/controllers/graphql/inputs/modules/create-module.input';
import { Module } from '@/controllers/graphql/types/module';
import { CreateModuleService } from '@/services/modules/create-module';

@Resolver(() => Module)
export class CreateModuleResolver {
  constructor(private readonly createModuleService: CreateModuleService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Module)
  async createModule(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateModuleInput
  ) {
    const response = await this.createModuleService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
