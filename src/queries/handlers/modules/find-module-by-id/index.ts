import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ModuleNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ModuleModel } from '@/models/module.model';
import { FindModuleByIdQuery } from '@/queries/implements/modules/find-module-by-id.query';
import { FindModuleByIdRepository } from '@/repositories/modules/find-module-by-id';

@QueryHandler(FindModuleByIdQuery)
export class FindModuleByIdQueryHandler
  implements IQueryHandler<FindModuleByIdQuery>
{
  constructor(
    private readonly findModuleByIdRepository: FindModuleByIdRepository
  ) {}

  async execute(query: FindModuleByIdQuery): Promise<ModuleModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const module = await this.findModuleByIdRepository.execute(id);
    if (!module) {
      throw new ModuleNotFoundException();
    }
    return module;
  }
}
