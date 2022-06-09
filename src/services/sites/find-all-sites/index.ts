import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllSitesDTO } from '@/dtos/sites/find-all-sites.dto';
import { SiteModel } from '@/models/site.model';
import { FindAllSitesQuery } from '@/queries/implements/sites/find-all-sites.query';

@Injectable()
export class FindAllSitesService
  implements IBaseService<FindAllSitesDTO, Promise<IPaginatedType<SiteModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllSitesDTO): Promise<IPaginatedType<SiteModel>> {
    return await this.queryBus.execute(new FindAllSitesQuery(data));
  }
}
