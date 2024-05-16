import { IQuery } from '@nestjs/cqrs';

import { FindProductsBestSellerByPeriodDTO } from '@/dtos/products/find-products-best-seller-by-period.dto';

export class FindProductsBestSellerByPeriodQuery
  implements IQuery, FindProductsBestSellerByPeriodDTO
{
  app: string;
  startAt: string;
  endAt: string;

  constructor(data: FindProductsBestSellerByPeriodDTO) {
    this.app = data.app;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
  }
}
