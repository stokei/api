import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { SitesLightColorModel } from '@/models/sites-light-color.model';
import { FindAllSitesLightColorsDTO } from '@/dtos/sites-light-colors/find-all-sites-light-colors.dto';
import { FindAllSitesLightColorsQuery } from '@/queries/implements/sites-light-colors/find-all-sites-light-colors.query';

@Injectable()
export class FindAllSitesLightColorsService
  implements
    IBaseService<
      FindAllSitesLightColorsDTO,
      Promise<IPaginatedType<SitesLightColorModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllSitesLightColorsDTO
  ): Promise<IPaginatedType<SitesLightColorModel>> {
    return await this.queryBus.execute(new FindAllSitesLightColorsQuery(data));
  }
}
