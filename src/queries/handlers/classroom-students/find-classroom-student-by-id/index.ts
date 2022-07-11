import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  ClassroomStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomStudentModel } from '@/models/classroom-student.model';
import { FindClassroomStudentByIdQuery } from '@/queries/implements/classroom-students/find-classroom-student-by-id.query';
import { FindClassroomStudentByIdRepository } from '@/repositories/classroom-students/find-classroom-student-by-id';

@QueryHandler(FindClassroomStudentByIdQuery)
export class FindClassroomStudentByIdQueryHandler
  implements IQueryHandler<FindClassroomStudentByIdQuery>
{
  constructor(
    private readonly findClassroomStudentByIdRepository: FindClassroomStudentByIdRepository
  ) {}

  async execute(
    query: FindClassroomStudentByIdQuery
  ): Promise<ClassroomStudentModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroomStudent =
      await this.findClassroomStudentByIdRepository.execute(id);
    if (!classroomStudent) {
      throw new ClassroomStudentNotFoundException();
    }
    return classroomStudent;
  }
}
