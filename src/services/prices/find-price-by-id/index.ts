import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { PriceModel } from '@/models/price.model';
import { FindPriceByIdQuery } from '@/queries/implements/prices/find-price-by-id.query';

@Injectable()
export class FindPriceByIdService
  implements IBaseService<string, Promise<PriceModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<PriceModel> {
    return await this.queryBus.execute(new FindPriceByIdQuery(data));
  }
}
