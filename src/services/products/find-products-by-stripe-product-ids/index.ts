import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ProductModel } from '@/models/product.model';
import { FindProductsByStripeProductIdsQuery } from '@/queries/implements/products/find-products-by-stripe-product-ids.query';

@Injectable()
export class FindProductsByStripeProductIdsService
  implements IBaseService<string[], Promise<ProductModel[]>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string[]): Promise<ProductModel[]> {
    return await this.queryBus.execute(
      new FindProductsByStripeProductIdsQuery(data)
    );
  }
}
