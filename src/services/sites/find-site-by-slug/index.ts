import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SiteModel } from '@/models/site.model';
import { FindSiteBySlugQuery } from '@/queries/implements/sites/find-site-by-slug.query';

@Injectable()
export class FindSiteBySlugService
  implements IBaseService<string, Promise<SiteModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(slug: string): Promise<SiteModel> {
    return await this.queryBus.execute(new FindSiteBySlugQuery(slug));
  }
}
