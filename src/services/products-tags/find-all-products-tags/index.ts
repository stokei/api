import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ProductsTagModel } from '@/models/products-tag.model';
import { FindAllProductsTagsDTO } from '@/dtos/products-tags/find-all-products-tags.dto';
import { FindAllProductsTagsQuery } from '@/queries/implements/products-tags/find-all-products-tags.query';

@Injectable()
export class FindAllProductsTagsService
  implements
    IBaseService<
      FindAllProductsTagsDTO,
      Promise<IPaginatedType<ProductsTagModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllProductsTagsDTO
  ): Promise<IPaginatedType<ProductsTagModel>> {
    return await this.queryBus.execute(new FindAllProductsTagsQuery(data));
  }
}
