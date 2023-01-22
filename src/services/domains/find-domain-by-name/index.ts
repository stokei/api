import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { Cache } from 'cache-manager';

import { DomainModel } from '@/models/domain.model';
import { FindDomainByNameQuery } from '@/queries/implements/domains/find-domain-by-name.query';

@Injectable()
export class FindDomainByNameService
  implements IBaseService<string, Promise<DomainModel>>
{
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async execute(name: string): Promise<DomainModel> {
    let domain: DomainModel = await this.cacheManager.get(name);
    if (!domain) {
      const EXPIRES_IN_ONE_MINUTE = 60 * 1000;
      domain = await this.queryBus.execute(new FindDomainByNameQuery(name));
      await this.cacheManager.set(name, domain, EXPIRES_IN_ONE_MINUTE);
    }
    return domain;
  }
}
