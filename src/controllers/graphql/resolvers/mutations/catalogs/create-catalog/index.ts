import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateCatalogInput } from '@/controllers/graphql/inputs/catalogs/create-catalog.input';
import { Catalog } from '@/controllers/graphql/types/catalog';
import { CreateCatalogService } from '@/services/catalogs/create-catalog';

@Resolver(() => Catalog)
export class CreateCatalogResolver {
  constructor(private readonly createCatalogService: CreateCatalogService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Catalog)
  async createCatalog(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateCatalogInput
  ) {
    const response = await this.createCatalogService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
