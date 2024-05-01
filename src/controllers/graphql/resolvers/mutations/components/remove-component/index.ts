import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveComponentInput } from '@/controllers/graphql/inputs/components/remove-component.input';
import { Component } from '@/controllers/graphql/types/component';
import { RemoveComponentService } from '@/services/components/remove-component';

@Resolver(() => Component)
export class RemoveComponentResolver {
  constructor(
    private readonly removeComponentService: RemoveComponentService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Component)
  async removeComponent(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveComponentInput
  ) {
    const response = await this.removeComponentService.execute({
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
