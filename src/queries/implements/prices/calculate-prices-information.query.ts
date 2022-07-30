import { IQuery } from '@nestjs/cqrs';

import { CalculatePricesInformationDTO } from '@/dtos/prices/calculate-prices-information.dto';

export class CalculatePricesInformationQuery
  implements IQuery, CalculatePricesInformationDTO
{
  prices: string[];

  constructor(data: CalculatePricesInformationDTO) {
    this.prices = data.prices;
  }
}
