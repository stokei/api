import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  ClassroomInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';
import { FindClassroomInstructorByIdQuery } from '@/queries/implements/classroom-instructors/find-classroom-instructor-by-id.query';
import { FindClassroomInstructorByIdRepository } from '@/repositories/classroom-instructors/find-classroom-instructor-by-id';

@QueryHandler(FindClassroomInstructorByIdQuery)
export class FindClassroomInstructorByIdQueryHandler
  implements IQueryHandler<FindClassroomInstructorByIdQuery>
{
  constructor(
    private readonly findClassroomInstructorByIdRepository: FindClassroomInstructorByIdRepository
  ) {}

  async execute(
    query: FindClassroomInstructorByIdQuery
  ): Promise<ClassroomInstructorModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroomInstructor =
      await this.findClassroomInstructorByIdRepository.execute(id);
    if (!classroomInstructor) {
      throw new ClassroomInstructorNotFoundException();
    }
    return classroomInstructor;
  }
}
