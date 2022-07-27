import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { DomainMapper } from '@/mappers/domains';
import { DomainModel } from '@/models/domain.model';
import { FindAllDomainsQuery } from '@/queries/implements/domains/find-all-domains.query';
import { CountDomainsRepository } from '@/repositories/domains/count-domains';
import { FindAllDomainsRepository } from '@/repositories/domains/find-all-domains';

@QueryHandler(FindAllDomainsQuery)
export class FindAllDomainsQueryHandler
  implements IQueryHandler<FindAllDomainsQuery>
{
  constructor(
    private readonly findAllDomainRepository: FindAllDomainsRepository,
    private readonly countDomainsRepository: CountDomainsRepository
  ) {}

  async execute(
    query: FindAllDomainsQuery
  ): Promise<IPaginatedType<DomainModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new DomainMapper().toFindAllQueryClean(query);
    const domains = await this.findAllDomainRepository.execute(data);
    const totalCount = await this.countDomainsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<DomainModel>().toPaginationList({
      items: domains,
      page: data.page,
      totalCount
    });
  }
}
