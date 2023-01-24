import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { DomainModel } from '@/models/domain.model';
import { FindDomainByNameQuery } from '@/queries/implements/domains/find-domain-by-name.query';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Injectable()
export class FindDomainByNameService
  implements IBaseService<string, Promise<DomainModel>>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  async execute(name: string): Promise<DomainModel> {
    const domain = await this.getOrSetCacheService.execute<DomainModel>(
      name,
      () => this.queryBus.execute(new FindDomainByNameQuery(name))
    );
    return domain;
  }
}
