import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { VersionMapper } from '@/mappers/versions';
import { VersionModel } from '@/models/version.model';
import { FindAllVersionsQuery } from '@/queries/implements/versions/find-all-versions.query';
import { CountVersionsRepository } from '@/repositories/versions/count-versions';
import { FindAllVersionsRepository } from '@/repositories/versions/find-all-versions';

@QueryHandler(FindAllVersionsQuery)
export class FindAllVersionsQueryHandler
  implements IQueryHandler<FindAllVersionsQuery>
{
  constructor(
    private readonly findAllVersionRepository: FindAllVersionsRepository,
    private readonly countVersionsRepository: CountVersionsRepository
  ) {}

  async execute(
    query: FindAllVersionsQuery
  ): Promise<IPaginatedType<VersionModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new VersionMapper().toFindAllQueryClean(query);
    const versions = await this.findAllVersionRepository.execute(data);
    const totalCount = await this.countVersionsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<VersionModel>().toPaginationList({
      items: versions,
      page: data.page,
      totalCount
    });
  }
}
