import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ModuleMapper } from '@/mappers/modules';
import { ModuleModel } from '@/models/module.model';
import { FindAllModulesQuery } from '@/queries/implements/modules/find-all-modules.query';
import { CountModulesRepository } from '@/repositories/modules/count-modules';
import { FindAllModulesRepository } from '@/repositories/modules/find-all-modules';

@QueryHandler(FindAllModulesQuery)
export class FindAllModulesQueryHandler
  implements IQueryHandler<FindAllModulesQuery>
{
  constructor(
    private readonly findAllModuleRepository: FindAllModulesRepository,
    private readonly countModulesRepository: CountModulesRepository
  ) {}

  async execute(
    query: FindAllModulesQuery
  ): Promise<IPaginatedType<ModuleModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new ModuleMapper().toFindAllQueryClean(query);
    const modules = await this.findAllModuleRepository.execute(data);
    const totalCount = await this.countModulesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ModuleModel>().toPaginationList({
      items: modules,
      page: data.page,
      totalCount
    });
  }
}
