import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { DomainModel } from '@/models/domain.model';
import { FindDomainByIdQuery } from '@/queries/implements/domains/find-domain-by-id.query';

@Injectable()
export class FindDomainByIdService
  implements IBaseService<string, Promise<DomainModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<DomainModel> {
    return await this.queryBus.execute(new FindDomainByIdQuery(data));
  }
}
