import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ProductNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ProductModel } from '@/models/product.model';
import { FindProductByIdRepository } from '@/repositories/products/find-product-by-id';
import { FindProductByIdQuery } from '@/queries/implements/products/find-product-by-id.query';

@QueryHandler(FindProductByIdQuery)
export class FindProductByIdQueryHandler
  implements IQueryHandler<FindProductByIdQuery>
{
  constructor(
    private readonly findProductByIdRepository: FindProductByIdRepository
  ) {}

  async execute(query: FindProductByIdQuery): Promise<ProductModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const product = await this.findProductByIdRepository.execute(id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    return product;
  }
}
