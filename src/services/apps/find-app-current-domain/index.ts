import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { DomainModel } from '@/models/domain.model';
import { FindAppCurrentDomainQuery } from '@/queries/implements/apps/find-app-current-domain.query';

@Injectable()
export class FindAppCurrentDomainService
  implements IBaseService<string, Promise<DomainModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(appId: string): Promise<DomainModel> {
    return await this.queryBus.execute(new FindAppCurrentDomainQuery(appId));
  }
}
