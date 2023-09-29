import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateOrUpdateComponentInput } from '@/controllers/graphql/inputs/components/create-or-update-component.input';
import { Component } from '@/controllers/graphql/types/component';
import { CreateOrUpdateComponentService } from '@/services/components/create-or-update-component';

@Resolver(() => Component)
export class CreateOrUpdateComponentResolver {
  constructor(
    private readonly createOrUpdateComponentService: CreateOrUpdateComponentService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Component)
  async createOrUpdateComponent(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateOrUpdateComponentInput
  ) {
    const response = await this.createOrUpdateComponentService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
