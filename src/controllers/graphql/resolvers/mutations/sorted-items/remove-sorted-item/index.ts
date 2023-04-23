import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveSortedItemInput } from '@/controllers/graphql/inputs/sorted-items/remove-sorted-item.input';
import { SortedItem } from '@/controllers/graphql/types/sorted-item';
import { RemoveSortedItemService } from '@/services/sorted-items/remove-sorted-item';

@Resolver(() => SortedItem)
export class RemoveSortedItemResolver {
  constructor(
    private readonly removeSortedItemService: RemoveSortedItemService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => SortedItem)
  async removeSortedItem(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveSortedItemInput
  ) {
    const response = await this.removeSortedItemService.execute({
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
