import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  ClassroomsMaterialNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';
import { FindClassroomsMaterialByIdQuery } from '@/queries/implements/classrooms-materials/find-classrooms-material-by-id.query';
import { FindClassroomsMaterialByIdRepository } from '@/repositories/classrooms-materials/find-classrooms-material-by-id';

@QueryHandler(FindClassroomsMaterialByIdQuery)
export class FindClassroomsMaterialByIdQueryHandler
  implements IQueryHandler<FindClassroomsMaterialByIdQuery>
{
  constructor(
    private readonly findClassroomsMaterialByIdRepository: FindClassroomsMaterialByIdRepository
  ) {}

  async execute(
    query: FindClassroomsMaterialByIdQuery
  ): Promise<ClassroomsMaterialModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroomsMaterial =
      await this.findClassroomsMaterialByIdRepository.execute(id);
    if (!classroomsMaterial) {
      throw new ClassroomsMaterialNotFoundException();
    }
    return classroomsMaterial;
  }
}
