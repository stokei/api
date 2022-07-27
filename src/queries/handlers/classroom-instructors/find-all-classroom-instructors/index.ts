import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ClassroomInstructorMapper } from '@/mappers/classroom-instructors';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';
import { FindAllClassroomInstructorsQuery } from '@/queries/implements/classroom-instructors/find-all-classroom-instructors.query';
import { CountClassroomInstructorsRepository } from '@/repositories/classroom-instructors/count-classroom-instructors';
import { FindAllClassroomInstructorsRepository } from '@/repositories/classroom-instructors/find-all-classroom-instructors';

@QueryHandler(FindAllClassroomInstructorsQuery)
export class FindAllClassroomInstructorsQueryHandler
  implements IQueryHandler<FindAllClassroomInstructorsQuery>
{
  constructor(
    private readonly findAllClassroomInstructorRepository: FindAllClassroomInstructorsRepository,
    private readonly countClassroomInstructorsRepository: CountClassroomInstructorsRepository
  ) {}

  async execute(
    query: FindAllClassroomInstructorsQuery
  ): Promise<IPaginatedType<ClassroomInstructorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new ClassroomInstructorMapper().toFindAllQueryClean(query);
    const classroomInstructors =
      await this.findAllClassroomInstructorRepository.execute(data);
    const totalCount = await this.countClassroomInstructorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomInstructorModel>().toPaginationList({
      items: classroomInstructors,
      page: data.page,
      totalCount
    });
  }
}
