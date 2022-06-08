import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { ProductModel } from '@/models/product.model';
import { FindProductByIdQuery } from '@/queries/implements/products/find-product-by-id.query';

@Injectable()
export class FindProductByIdService
  implements IBaseService<string, Promise<ProductModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ProductModel> {
    return await this.queryBus.execute(new FindProductByIdQuery(data));
  }
}
