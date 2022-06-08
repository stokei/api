import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ProductsImageNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ProductsImageModel } from '@/models/products-image.model';
import { FindProductsImageByIdRepository } from '@/repositories/products-images/find-products-image-by-id';
import { FindProductsImageByIdQuery } from '@/queries/implements/products-images/find-products-image-by-id.query';

@QueryHandler(FindProductsImageByIdQuery)
export class FindProductsImageByIdQueryHandler
  implements IQueryHandler<FindProductsImageByIdQuery>
{
  constructor(
    private readonly findProductsImageByIdRepository: FindProductsImageByIdRepository
  ) {}

  async execute(
    query: FindProductsImageByIdQuery
  ): Promise<ProductsImageModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const productsImage = await this.findProductsImageByIdRepository.execute(
      id
    );
    if (!productsImage) {
      throw new ProductsImageNotFoundException();
    }
    return productsImage;
  }
}
