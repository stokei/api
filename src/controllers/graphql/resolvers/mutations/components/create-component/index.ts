import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateComponentInput } from '@/controllers/graphql/inputs/components/create-component.input';
import { Component } from '@/controllers/graphql/types/component';
import { CreateComponentService } from '@/services/components/create-component';

@Resolver(() => Component)
export class CreateComponentResolver {
  constructor(
    private readonly createComponentService: CreateComponentService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Component)
  async createComponent(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateComponentInput
  ) {
    const response = await this.createComponentService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
