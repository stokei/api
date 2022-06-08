import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ProductsTagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ProductsTagModel } from '@/models/products-tag.model';
import { FindProductsTagByIdRepository } from '@/repositories/products-tags/find-products-tag-by-id';
import { FindProductsTagByIdQuery } from '@/queries/implements/products-tags/find-products-tag-by-id.query';

@QueryHandler(FindProductsTagByIdQuery)
export class FindProductsTagByIdQueryHandler
  implements IQueryHandler<FindProductsTagByIdQuery>
{
  constructor(
    private readonly findProductsTagByIdRepository: FindProductsTagByIdRepository
  ) {}

  async execute(query: FindProductsTagByIdQuery): Promise<ProductsTagModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const productsTag = await this.findProductsTagByIdRepository.execute(id);
    if (!productsTag) {
      throw new ProductsTagNotFoundException();
    }
    return productsTag;
  }
}
