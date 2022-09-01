import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CalculatePlanPriceDTO } from '@/dtos/plans/calculate-plan-price.dto';
import { CalculatePlanPriceResponse } from '@/dtos/plans/calculate-plan-price-response';
import { CalculatePlanPriceQuery } from '@/queries/implements/plans/calculate-plan-price.query';

@Injectable()
export class CalculatePlanPriceService
  implements
    IBaseService<CalculatePlanPriceDTO, Promise<CalculatePlanPriceResponse>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: CalculatePlanPriceDTO
  ): Promise<CalculatePlanPriceResponse> {
    return await this.queryBus.execute(new CalculatePlanPriceQuery(data));
  }
}
