import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ClassroomModuleMapper } from '@/mappers/classroom-modules';
import { ClassroomModuleModel } from '@/models/classroom-module.model';
import { FindAllClassroomModulesQuery } from '@/queries/implements/classroom-modules/find-all-classroom-modules.query';
import { CountClassroomModulesRepository } from '@/repositories/classroom-modules/count-classroom-modules';
import { FindAllClassroomModulesRepository } from '@/repositories/classroom-modules/find-all-classroom-modules';

@QueryHandler(FindAllClassroomModulesQuery)
export class FindAllClassroomModulesQueryHandler
  implements IQueryHandler<FindAllClassroomModulesQuery>
{
  constructor(
    private readonly findAllClassroomModuleRepository: FindAllClassroomModulesRepository,
    private readonly countClassroomModulesRepository: CountClassroomModulesRepository
  ) {}

  async execute(
    query: FindAllClassroomModulesQuery
  ): Promise<IPaginatedType<ClassroomModuleModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new ClassroomModuleMapper().toFindAllQueryClean(query);
    const classroomModules =
      await this.findAllClassroomModuleRepository.execute(data);
    const totalCount = await this.countClassroomModulesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomModuleModel>().toPaginationList({
      items: classroomModules,
      page: data.page,
      totalCount
    });
  }
}
