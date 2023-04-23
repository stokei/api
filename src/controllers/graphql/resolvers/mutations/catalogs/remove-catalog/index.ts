import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppGuard } from '@/common/guards/app';
import { RemoveCatalogInput } from '@/controllers/graphql/inputs/catalogs/remove-catalog.input';
import { Catalog } from '@/controllers/graphql/types/catalog';
import { RemoveCatalogService } from '@/services/catalogs/remove-catalog';

@Resolver(() => Catalog)
export class RemoveCatalogResolver {
  constructor(private readonly removeCatalogService: RemoveCatalogService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Catalog)
  async removeCatalog(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveCatalogInput
  ) {
    const response = await this.removeCatalogService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
