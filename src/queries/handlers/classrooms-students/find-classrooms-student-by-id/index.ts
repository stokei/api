import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ClassroomsStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomsStudentModel } from '@/models/classrooms-student.model';
import { FindClassroomsStudentByIdRepository } from '@/repositories/classrooms-students/find-classrooms-student-by-id';
import { FindClassroomsStudentByIdQuery } from '@/queries/implements/classrooms-students/find-classrooms-student-by-id.query';

@QueryHandler(FindClassroomsStudentByIdQuery)
export class FindClassroomsStudentByIdQueryHandler
  implements IQueryHandler<FindClassroomsStudentByIdQuery>
{
  constructor(
    private readonly findClassroomsStudentByIdRepository: FindClassroomsStudentByIdRepository
  ) {}

  async execute(
    query: FindClassroomsStudentByIdQuery
  ): Promise<ClassroomsStudentModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroomsStudent =
      await this.findClassroomsStudentByIdRepository.execute(id);
    if (!classroomsStudent) {
      throw new ClassroomsStudentNotFoundException();
    }
    return classroomsStudent;
  }
}
