import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindProductsBestSellerByPeriodDTO } from '@/dtos/products/find-products-best-seller-by-period.dto';
import { ProductBestSellerModel } from '@/models/product-best-seller.model';
import { FindProductsBestSellerByPeriodQuery } from '@/queries/implements/products/find-products-best-seller-by-period.query';

@Injectable()
export class FindProductsBestSellerByPeriodService
  implements
    IBaseService<
      FindProductsBestSellerByPeriodDTO,
      Promise<ProductBestSellerModel[]>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindProductsBestSellerByPeriodDTO
  ): Promise<ProductBestSellerModel[]> {
    return await this.queryBus.execute(
      new FindProductsBestSellerByPeriodQuery(data)
    );
  }
}
