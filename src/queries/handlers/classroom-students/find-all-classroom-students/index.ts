import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ClassroomStudentMapper } from '@/mappers/classroom-students';
import { ClassroomStudentModel } from '@/models/classroom-student.model';
import { FindAllClassroomStudentsQuery } from '@/queries/implements/classroom-students/find-all-classroom-students.query';
import { CountClassroomStudentsRepository } from '@/repositories/classroom-students/count-classroom-students';
import { FindAllClassroomStudentsRepository } from '@/repositories/classroom-students/find-all-classroom-students';

@QueryHandler(FindAllClassroomStudentsQuery)
export class FindAllClassroomStudentsQueryHandler
  implements IQueryHandler<FindAllClassroomStudentsQuery>
{
  constructor(
    private readonly findAllClassroomStudentRepository: FindAllClassroomStudentsRepository,
    private readonly countClassroomStudentsRepository: CountClassroomStudentsRepository
  ) {}

  async execute(
    query: FindAllClassroomStudentsQuery
  ): Promise<IPaginatedType<ClassroomStudentModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new ClassroomStudentMapper().toFindAllQueryClean(query);
    const classroomStudents =
      await this.findAllClassroomStudentRepository.execute(data);
    const totalCount = await this.countClassroomStudentsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomStudentModel>().toPaginationList({
      items: classroomStudents,
      page: data.page,
      totalCount
    });
  }
}
