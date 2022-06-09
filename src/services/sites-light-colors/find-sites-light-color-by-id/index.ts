import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SitesLightColorModel } from '@/models/sites-light-color.model';
import { FindSitesLightColorByIdQuery } from '@/queries/implements/sites-light-colors/find-sites-light-color-by-id.query';

@Injectable()
export class FindSitesLightColorByIdService
  implements IBaseService<string, Promise<SitesLightColorModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<SitesLightColorModel> {
    return await this.queryBus.execute(new FindSitesLightColorByIdQuery(data));
  }
}
