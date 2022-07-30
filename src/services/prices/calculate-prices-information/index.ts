import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CalculatePricesInformationDTO } from '@/dtos/prices/calculate-prices-information.dto';
import { CalculatePricesInformationResponse } from '@/dtos/prices/calculate-prices-information-response';
import { CalculatePricesInformationQuery } from '@/queries/implements/prices/calculate-prices-information.query';

@Injectable()
export class CalculatePricesInformationService
  implements
    IBaseService<
      CalculatePricesInformationDTO,
      Promise<CalculatePricesInformationResponse>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: CalculatePricesInformationDTO
  ): Promise<CalculatePricesInformationResponse> {
    return await this.queryBus.execute(
      new CalculatePricesInformationQuery(data)
    );
  }
}
