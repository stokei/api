import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  ProductsNotFoundException
} from '@/errors';
import { ProductModel } from '@/models/product.model';
import { FindProductsByStripeProductIdsQuery } from '@/queries/implements/products/find-products-by-stripe-product-ids.query';
import { FindProductsByStripeProductIdsRepository } from '@/repositories/products/find-products-by-stripe-product-ids';

@QueryHandler(FindProductsByStripeProductIdsQuery)
export class FindProductsByStripeProductIdsQueryHandler
  implements IQueryHandler<FindProductsByStripeProductIdsQuery>
{
  constructor(
    private readonly findProductsByStripeProductIdsRepository: FindProductsByStripeProductIdsRepository
  ) {}

  async execute(
    query: FindProductsByStripeProductIdsQuery
  ): Promise<ProductModel[]> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const ids =
      query.ids?.length > 0
        ? query.ids.map((id) => cleanValue(id))?.filter(Boolean)
        : undefined;
    if (!ids?.length) {
      throw new ParamNotFoundException('ids');
    }

    const products =
      await this.findProductsByStripeProductIdsRepository.execute(ids);
    if (!products) {
      throw new ProductsNotFoundException();
    }
    return products;
  }
}
