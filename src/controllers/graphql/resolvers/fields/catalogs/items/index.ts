import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllCatalogItemsInput } from '@/controllers/graphql/inputs/catalog-items/find-all-catalog-items.input';
import { Catalog } from '@/controllers/graphql/types/catalog';
import { CatalogItems } from '@/controllers/graphql/types/catalog-items';
import { CatalogModel } from '@/models/catalog.model';
import { FindAllCatalogItemsService } from '@/services/catalog-items/find-all-catalog-items';

@Resolver(() => Catalog)
export class CatalogCatalogItemsResolver {
  constructor(
    private readonly findAllCatalogItemsService: FindAllCatalogItemsService
  ) {}

  @ResolveField(() => CatalogItems, { nullable: true })
  items(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCatalogItemsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCatalogItemsInput,
    @Parent() catalog: CatalogModel
  ) {
    return this.findAllCatalogItemsService.execute({
      page,
      orderBy,
      where: {
        AND: {
          catalog: {
            equals: catalog.id
          }
        }
      }
    });
  }
}
