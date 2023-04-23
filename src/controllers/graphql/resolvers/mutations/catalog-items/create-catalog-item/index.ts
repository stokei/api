import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateCatalogItemInput } from '@/controllers/graphql/inputs/catalog-items/create-catalog-item.input';
import { CatalogItem } from '@/controllers/graphql/types/catalog-item';
import { CreateCatalogItemService } from '@/services/catalog-items/create-catalog-item';

@Resolver(() => CatalogItem)
export class CreateCatalogItemResolver {
  constructor(
    private readonly createCatalogItemService: CreateCatalogItemService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => CatalogItem)
  async createCatalogItem(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateCatalogItemInput
  ) {
    const response = await this.createCatalogItemService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
