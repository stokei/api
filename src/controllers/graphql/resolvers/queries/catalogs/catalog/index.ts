import { Args, Query, Resolver } from '@nestjs/graphql';

import { CatalogsLoader } from '@/controllers/graphql/dataloaders/catalogs.loader';
import { Catalog } from '@/controllers/graphql/types/catalog';
import { CatalogNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Catalog)
export class CatalogResolver {
  constructor(private readonly catalogsLoader: CatalogsLoader) {}

  @Query(() => Catalog)
  async catalog(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const catalog = await this.catalogsLoader.findByIds.load(id);
    if (!catalog) {
      throw new CatalogNotFoundException();
    }
    return catalog;
  }
}
