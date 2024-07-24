import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ProductComboItemsLoader } from '@/controllers/graphql/dataloaders/product-combo-items.loader';
import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';
import { FindAllProductsService } from '@/services/products/find-all-products';

@Resolver(() => Product)
export class ProductComboResolver {
  constructor(
    private readonly findAllProductsService: FindAllProductsService,
    private readonly productComboItemsLoader: ProductComboItemsLoader
  ) {}

  @ResolveField(() => [Product], { nullable: true })
  async combo(@Parent() product: ProductModel) {
    const comboItems = await this.productComboItemsLoader.findByParentIds.load(
      product.id
    );
    if (!comboItems?.totalCount) {
      return [];
    }
    const productIds = comboItems?.items?.map(({ product }) => product);
    return (
      await this.findAllProductsService.execute({
        where: {
          AND: {
            ids: productIds
          }
        }
      })
    )?.items;
  }
}
