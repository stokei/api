import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateComponentsOrderInput } from '@/controllers/graphql/inputs/components/update-components-order.input';
import { Component } from '@/controllers/graphql/types/component';
import { UpdateComponentsOrderService } from '@/services/components/update-components-order';

@Resolver(() => Component)
export class UpdateComponentsOrderResolver {
  constructor(
    private readonly updateComponentsOrderService: UpdateComponentsOrderService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => [Component])
  async updateComponentsOrder(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateComponentsOrderInput
  ) {
    const response = await this.updateComponentsOrderService.execute({
      ...data,
      app: appId,
      updatedBy: currentAccountId
    });
    return response;
  }
}
