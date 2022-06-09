import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllSitesDarkColorsDTO } from '@/dtos/sites-dark-colors/find-all-sites-dark-colors.dto';
import { SitesDarkColorModel } from '@/models/sites-dark-color.model';
import { FindAllSitesDarkColorsQuery } from '@/queries/implements/sites-dark-colors/find-all-sites-dark-colors.query';

@Injectable()
export class FindAllSitesDarkColorsService
  implements
    IBaseService<
      FindAllSitesDarkColorsDTO,
      Promise<IPaginatedType<SitesDarkColorModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllSitesDarkColorsDTO
  ): Promise<IPaginatedType<SitesDarkColorModel>> {
    return await this.queryBus.execute(new FindAllSitesDarkColorsQuery(data));
  }
}
