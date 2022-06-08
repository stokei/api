import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { PriceModel } from '@/models/price.model';
import { FindAllPricesDTO } from '@/dtos/prices/find-all-prices.dto';
import { FindAllPricesQuery } from '@/queries/implements/prices/find-all-prices.query';

@Injectable()
export class FindAllPricesService
  implements
    IBaseService<FindAllPricesDTO, Promise<IPaginatedType<PriceModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllPricesDTO): Promise<IPaginatedType<PriceModel>> {
    return await this.queryBus.execute(new FindAllPricesQuery(data));
  }
}
