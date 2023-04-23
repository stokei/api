import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateCatalogInput } from '@/controllers/graphql/inputs/catalogs/update-catalog.input';
import { Catalog } from '@/controllers/graphql/types/catalog';
import { UpdateCatalogService } from '@/services/catalogs/update-catalog';

@Resolver(() => Catalog)
export class UpdateCatalogResolver {
  constructor(private readonly updateCatalogService: UpdateCatalogService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Catalog)
  async updateCatalog(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateCatalogInput
  ) {
    const response = await this.updateCatalogService.execute({
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
