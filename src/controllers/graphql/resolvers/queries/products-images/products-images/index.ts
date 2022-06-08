import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllProductsImagesInput,
  WhereDataFindAllProductsImagesInput
} from '@/controllers/graphql/inputs/products-images/find-all-products-images.input';
import { ProductsImage } from '@/controllers/graphql/types/products-image';
import { ProductsImages } from '@/controllers/graphql/types/products-images';
import { FindAllProductsImagesService } from '@/services/products-images/find-all-products-images';

@Resolver(() => ProductsImage)
export class ProductsImagesResolver {
  constructor(
    private readonly findAllProductsImagesService: FindAllProductsImagesService
  ) {}

  @Query(() => ProductsImages)
  async productsImages(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllProductsImagesInput,
      nullable: true
    })
    where: WhereDataFindAllProductsImagesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllProductsImagesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllProductsImagesInput
  ) {
    return await this.findAllProductsImagesService.execute({
      page,
      where,
      orderBy
    });
  }
}
