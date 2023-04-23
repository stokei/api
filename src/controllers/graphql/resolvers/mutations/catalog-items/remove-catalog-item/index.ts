import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveCatalogItemInput } from '@/controllers/graphql/inputs/catalog-items/remove-catalog-item.input';
import { CatalogItem } from '@/controllers/graphql/types/catalog-item';
import { RemoveCatalogItemService } from '@/services/catalog-items/remove-catalog-item';

@Resolver(() => CatalogItem)
export class RemoveCatalogItemResolver {
  constructor(
    private readonly removeCatalogItemService: RemoveCatalogItemService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => CatalogItem)
  async removeCatalogItem(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveCatalogItemInput
  ) {
    const response = await this.removeCatalogItemService.execute({
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
