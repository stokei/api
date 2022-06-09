import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  ClassroomsEnrollmentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';
import { FindClassroomsEnrollmentByIdQuery } from '@/queries/implements/classrooms-enrollments/find-classrooms-enrollment-by-id.query';
import { FindClassroomsEnrollmentByIdRepository } from '@/repositories/classrooms-enrollments/find-classrooms-enrollment-by-id';

@QueryHandler(FindClassroomsEnrollmentByIdQuery)
export class FindClassroomsEnrollmentByIdQueryHandler
  implements IQueryHandler<FindClassroomsEnrollmentByIdQuery>
{
  constructor(
    private readonly findClassroomsEnrollmentByIdRepository: FindClassroomsEnrollmentByIdRepository
  ) {}

  async execute(
    query: FindClassroomsEnrollmentByIdQuery
  ): Promise<ClassroomsEnrollmentModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroomsEnrollment =
      await this.findClassroomsEnrollmentByIdRepository.execute(id);
    if (!classroomsEnrollment) {
      throw new ClassroomsEnrollmentNotFoundException();
    }
    return classroomsEnrollment;
  }
}
