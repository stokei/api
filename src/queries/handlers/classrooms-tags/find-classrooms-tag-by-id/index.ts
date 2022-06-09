import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  ClassroomsTagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomsTagModel } from '@/models/classrooms-tag.model';
import { FindClassroomsTagByIdQuery } from '@/queries/implements/classrooms-tags/find-classrooms-tag-by-id.query';
import { FindClassroomsTagByIdRepository } from '@/repositories/classrooms-tags/find-classrooms-tag-by-id';

@QueryHandler(FindClassroomsTagByIdQuery)
export class FindClassroomsTagByIdQueryHandler
  implements IQueryHandler<FindClassroomsTagByIdQuery>
{
  constructor(
    private readonly findClassroomsTagByIdRepository: FindClassroomsTagByIdRepository
  ) {}

  async execute(
    query: FindClassroomsTagByIdQuery
  ): Promise<ClassroomsTagModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroomsTag = await this.findClassroomsTagByIdRepository.execute(
      id
    );
    if (!classroomsTag) {
      throw new ClassroomsTagNotFoundException();
    }
    return classroomsTag;
  }
}
