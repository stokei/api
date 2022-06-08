import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ProductsImageModel } from '@/models/products-image.model';
import { FindAllProductsImagesDTO } from '@/dtos/products-images/find-all-products-images.dto';
import { FindAllProductsImagesQuery } from '@/queries/implements/products-images/find-all-products-images.query';

@Injectable()
export class FindAllProductsImagesService
  implements
    IBaseService<
      FindAllProductsImagesDTO,
      Promise<IPaginatedType<ProductsImageModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllProductsImagesDTO
  ): Promise<IPaginatedType<ProductsImageModel>> {
    return await this.queryBus.execute(new FindAllProductsImagesQuery(data));
  }
}
