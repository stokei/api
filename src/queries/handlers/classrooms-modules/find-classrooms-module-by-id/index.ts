import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ClassroomsModuleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ClassroomsModuleModel } from '@/models/classrooms-module.model';
import { FindClassroomsModuleByIdRepository } from '@/repositories/classrooms-modules/find-classrooms-module-by-id';
import { FindClassroomsModuleByIdQuery } from '@/queries/implements/classrooms-modules/find-classrooms-module-by-id.query';

@QueryHandler(FindClassroomsModuleByIdQuery)
export class FindClassroomsModuleByIdQueryHandler
  implements IQueryHandler<FindClassroomsModuleByIdQuery>
{
  constructor(
    private readonly findClassroomsModuleByIdRepository: FindClassroomsModuleByIdRepository
  ) {}

  async execute(
    query: FindClassroomsModuleByIdQuery
  ): Promise<ClassroomsModuleModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const classroomsModule =
      await this.findClassroomsModuleByIdRepository.execute(id);
    if (!classroomsModule) {
      throw new ClassroomsModuleNotFoundException();
    }
    return classroomsModule;
  }
}
