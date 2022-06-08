import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { ProductsImageModel } from '@/models/products-image.model';
import { FindProductsImageByIdQuery } from '@/queries/implements/products-images/find-products-image-by-id.query';

@Injectable()
export class FindProductsImageByIdService
  implements IBaseService<string, Promise<ProductsImageModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ProductsImageModel> {
    return await this.queryBus.execute(new FindProductsImageByIdQuery(data));
  }
}
