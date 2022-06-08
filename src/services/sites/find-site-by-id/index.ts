import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { SiteModel } from '@/models/site.model';
import { FindSiteByIdQuery } from '@/queries/implements/sites/find-site-by-id.query';

@Injectable()
export class FindSiteByIdService
  implements IBaseService<string, Promise<SiteModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<SiteModel> {
    return await this.queryBus.execute(new FindSiteByIdQuery(data));
  }
}
