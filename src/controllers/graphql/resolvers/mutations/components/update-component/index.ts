import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateComponentInput } from '@/controllers/graphql/inputs/components/update-component.input';
import { Component } from '@/controllers/graphql/types/component';
import { UpdateComponentService } from '@/services/components/update-component';

@Resolver(() => Component)
export class UpdateComponentResolver {
  constructor(
    private readonly updateComponentService: UpdateComponentService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Component)
  async updateComponent(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateComponentInput
  ) {
    const response = await this.updateComponentService.execute({
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
