import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { AccessMapper } from '@/mappers/accesses';
import { AccessModel } from '@/models/access.model';
import { FindAllAccessesQuery } from '@/queries/implements/accesses/find-all-accesses.query';
import { CountAccessesRepository } from '@/repositories/accesses/count-accesses';
import { FindAllAccessesRepository } from '@/repositories/accesses/find-all-accesses';

@QueryHandler(FindAllAccessesQuery)
export class FindAllAccessesQueryHandler
  implements IQueryHandler<FindAllAccessesQuery>
{
  constructor(
    private readonly findAllAccessRepository: FindAllAccessesRepository,
    private readonly countAccessesRepository: CountAccessesRepository
  ) {}

  async execute(
    query: FindAllAccessesQuery
  ): Promise<IPaginatedType<AccessModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new AccessMapper().toFindAllQueryClean(query);
    const accesses = await this.findAllAccessRepository.execute(data);
    const totalCount = await this.countAccessesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<AccessModel>().toPaginationList({
      items: accesses,
      page: data.page,
      totalCount
    });
  }
}
