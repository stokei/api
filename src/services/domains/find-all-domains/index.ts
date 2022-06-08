import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { DomainModel } from '@/models/domain.model';
import { FindAllDomainsDTO } from '@/dtos/domains/find-all-domains.dto';
import { FindAllDomainsQuery } from '@/queries/implements/domains/find-all-domains.query';

@Injectable()
export class FindAllDomainsService
  implements
    IBaseService<FindAllDomainsDTO, Promise<IPaginatedType<DomainModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllDomainsDTO): Promise<IPaginatedType<DomainModel>> {
    return await this.queryBus.execute(new FindAllDomainsQuery(data));
  }
}
