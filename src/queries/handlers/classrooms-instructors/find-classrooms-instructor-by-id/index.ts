import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  ClassroomsInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';
import { FindClassroomsInstructorByIdQuery } from '@/queries/implements/classrooms-instructors/find-classrooms-instructor-by-id.query';
import { FindClassroomsInstructorByIdRepository } from '@/repositories/classrooms-instructors/find-classrooms-instructor-by-id';

@QueryHandler(FindClassroomsInstructorByIdQuery)
export class FindClassroomsInstructorByIdQueryHandler
  implements IQueryHandler<FindClassroomsInstructorByIdQuery>
{
  constructor(
    private readonly findClassroomsInstructorByIdRepository: FindClassroomsInstructorByIdRepository
  ) {}

  async execute(
    query: FindClassroomsInstructorByIdQuery
  ): Promise<ClassroomsInstructorModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroomsInstructor =
      await this.findClassroomsInstructorByIdRepository.execute(id);
    if (!classroomsInstructor) {
      throw new ClassroomsInstructorNotFoundException();
    }
    return classroomsInstructor;
  }
}
