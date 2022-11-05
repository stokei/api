import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  AppInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { AppInstructorModel } from '@/models/app-instructor.model';
import { FindAppInstructorByIdQuery } from '@/queries/implements/app-instructors/find-app-instructor-by-id.query';
import { FindAppInstructorByIdRepository } from '@/repositories/app-instructors/find-app-instructor-by-id';

@QueryHandler(FindAppInstructorByIdQuery)
export class FindAppInstructorByIdQueryHandler
  implements IQueryHandler<FindAppInstructorByIdQuery>
{
  constructor(
    private readonly findAppInstructorByIdRepository: FindAppInstructorByIdRepository
  ) {}

  async execute(
    query: FindAppInstructorByIdQuery
  ): Promise<AppInstructorModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const appInstructor = await this.findAppInstructorByIdRepository.execute(
      id
    );
    if (!appInstructor) {
      throw new AppInstructorNotFoundException();
    }
    return appInstructor;
  }
}
