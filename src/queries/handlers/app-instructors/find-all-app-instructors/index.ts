import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { AppInstructorMapper } from '@/mappers/app-instructors';
import { AppInstructorModel } from '@/models/app-instructor.model';
import { FindAllAppInstructorsQuery } from '@/queries/implements/app-instructors/find-all-app-instructors.query';
import { CountAppInstructorsRepository } from '@/repositories/app-instructors/count-app-instructors';
import { FindAllAppInstructorsRepository } from '@/repositories/app-instructors/find-all-app-instructors';

@QueryHandler(FindAllAppInstructorsQuery)
export class FindAllAppInstructorsQueryHandler
  implements IQueryHandler<FindAllAppInstructorsQuery>
{
  constructor(
    private readonly findAllAppInstructorRepository: FindAllAppInstructorsRepository,
    private readonly countAppInstructorsRepository: CountAppInstructorsRepository
  ) {}

  async execute(
    query: FindAllAppInstructorsQuery
  ): Promise<IPaginatedType<AppInstructorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new AppInstructorMapper().toFindAllQueryClean(query);
    const appInstructors = await this.findAllAppInstructorRepository.execute(
      data
    );
    const totalCount = await this.countAppInstructorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<AppInstructorModel>().toPaginationList({
      items: appInstructors,
      page: data.page,
      totalCount
    });
  }
}
