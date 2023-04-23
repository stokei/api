import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateSortedItemInput } from '@/controllers/graphql/inputs/sorted-items/create-sorted-item.input';
import { SortedItem } from '@/controllers/graphql/types/sorted-item';
import { CreateSortedItemService } from '@/services/sorted-items/create-sorted-item';

@Resolver(() => SortedItem)
export class CreateSortedItemResolver {
  constructor(
    private readonly createSortedItemService: CreateSortedItemService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => SortedItem)
  async createSortedItem(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateSortedItemInput
  ) {
    const response = await this.createSortedItemService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
