import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { DomainModel } from '@/models/domain.model';
import { FindSiteCurrentDomainQuery } from '@/queries/implements/sites/find-site-current-domain.query';

@Injectable()
export class FindSiteCurrentDomainService
  implements IBaseService<string, Promise<DomainModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(siteId: string): Promise<DomainModel> {
    return await this.queryBus.execute(new FindSiteCurrentDomainQuery(siteId));
  }
}
