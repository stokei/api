import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { AppMapper } from '@/mappers/apps';
import { AppModel } from '@/models/app.model';
import { FindAllAppsQuery } from '@/queries/implements/apps/find-all-apps.query';
import { CountAppsRepository } from '@/repositories/apps/count-apps';
import { FindAllAppsRepository } from '@/repositories/apps/find-all-apps';

@QueryHandler(FindAllAppsQuery)
export class FindAllAppsQueryHandler
  implements IQueryHandler<FindAllAppsQuery>
{
  constructor(
    private readonly findAllAppRepository: FindAllAppsRepository,
    private readonly countAppsRepository: CountAppsRepository
  ) {}

  async execute(query: FindAllAppsQuery): Promise<IPaginatedType<AppModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new AppMapper().toFindAllQueryClean(query);
    const apps = await this.findAllAppRepository.execute(data);
    const totalCount = await this.countAppsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<AppModel>().toPaginationList({
      items: apps,
      page: data.page,
      totalCount
    });
  }
}
