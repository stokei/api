import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllProductsDTO } from '@/dtos/products/find-all-products.dto';
import { ProductModel } from '@/models/product.model';
import { FindAllProductsQuery } from '@/queries/implements/products/find-all-products.query';

@Injectable()
export class FindAllProductsService
  implements
    IBaseService<FindAllProductsDTO, Promise<IPaginatedType<ProductModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllProductsDTO
  ): Promise<IPaginatedType<ProductModel>> {
    return await this.queryBus.execute(new FindAllProductsQuery(data));
  }
}
