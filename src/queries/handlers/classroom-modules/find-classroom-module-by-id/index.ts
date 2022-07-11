import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  ClassroomModuleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomModuleModel } from '@/models/classroom-module .model';
import { FindClassroomModuleByIdQuery } from '@/queries/implements/classroom-module s/find-classroom-module -by-id.query';
import { FindClassroomModuleByIdRepository } from '@/repositories/classroom-module s/find-classroom-module -by-id';

@QueryHandler(FindClassroomModuleByIdQuery)
export class FindClassroomModuleByIdQueryHandler
  implements IQueryHandler<FindClassroomModuleByIdQuery>
{
  constructor(
    private readonly findClassroomModuleByIdRepository: FindClassroomModuleByIdRepository
  ) {}

  async execute(
    query: FindClassroomModuleByIdQuery
  ): Promise<ClassroomModuleModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroomModule =
      await this.findClassroomModuleByIdRepository.execute(id);
    if (!classroomModule) {
      throw new ClassroomModuleNotFoundException();
    }
    return classroomModule;
  }
}
