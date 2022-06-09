import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  ClassroomNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomModel } from '@/models/classroom.model';
import { FindClassroomByIdQuery } from '@/queries/implements/classrooms/find-classroom-by-id.query';
import { FindClassroomByIdRepository } from '@/repositories/classrooms/find-classroom-by-id';

@QueryHandler(FindClassroomByIdQuery)
export class FindClassroomByIdQueryHandler
  implements IQueryHandler<FindClassroomByIdQuery>
{
  constructor(
    private readonly findClassroomByIdRepository: FindClassroomByIdRepository
  ) {}

  async execute(query: FindClassroomByIdQuery): Promise<ClassroomModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroom = await this.findClassroomByIdRepository.execute(id);
    if (!classroom) {
      throw new ClassroomNotFoundException();
    }
    return classroom;
  }
}
