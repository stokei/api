import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ModulesMaterialNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ModulesMaterialModel } from '@/models/modules-material.model';
import { FindModulesMaterialByIdQuery } from '@/queries/implements/modules-materials/find-modules-material-by-id.query';
import { FindModulesMaterialByIdRepository } from '@/repositories/modules-materials/find-modules-material-by-id';

@QueryHandler(FindModulesMaterialByIdQuery)
export class FindModulesMaterialByIdQueryHandler
  implements IQueryHandler<FindModulesMaterialByIdQuery>
{
  constructor(
    private readonly findModulesMaterialByIdRepository: FindModulesMaterialByIdRepository
  ) {}

  async execute(
    query: FindModulesMaterialByIdQuery
  ): Promise<ModulesMaterialModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const modulesMaterial =
      await this.findModulesMaterialByIdRepository.execute(id);
    if (!modulesMaterial) {
      throw new ModulesMaterialNotFoundException();
    }
    return modulesMaterial;
  }
}
