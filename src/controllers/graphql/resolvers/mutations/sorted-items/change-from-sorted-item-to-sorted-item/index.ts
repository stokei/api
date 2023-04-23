import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { ChangeFromSortedItemToSortedItemInput } from '@/controllers/graphql/inputs/sorted-items/change-from-sorted-item-to-sorted-item.input';
import { ChangeFromSortedItemToSortedItemResponse } from '@/controllers/graphql/types/change-from-sorted-item-to-sorted-item-response';
import { SortedItem } from '@/controllers/graphql/types/sorted-item';
import { ChangeFromSortedItemToSortedItemService } from '@/services/sorted-items/change-from-sorted-item-to-sorted-item';

@Resolver(() => SortedItem)
export class ChangeFromSortedItemToSortedItemResolver {
  constructor(
    private readonly changeFromSortedItemToSortedItemService: ChangeFromSortedItemToSortedItemService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => ChangeFromSortedItemToSortedItemResponse)
  async changeFromSortedItemToSortedItem(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: ChangeFromSortedItemToSortedItemInput
  ) {
    const response = await this.changeFromSortedItemToSortedItemService.execute(
      {
        ...data,
        app: appId,
        updatedBy: currentAccountId
      }
    );
    return response;
  }
}
