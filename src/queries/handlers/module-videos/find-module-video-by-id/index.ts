import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ModuleVideoNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ModuleVideoModel } from '@/models/module-video.model';
import { FindModuleVideoByIdQuery } from '@/queries/implements/module-videos/find-module-video-by-id.query';
import { FindModuleVideoByIdRepository } from '@/repositories/module-videos/find-module-video-by-id';

@QueryHandler(FindModuleVideoByIdQuery)
export class FindModuleVideoByIdQueryHandler
  implements IQueryHandler<FindModuleVideoByIdQuery>
{
  constructor(
    private readonly findModuleVideoByIdRepository: FindModuleVideoByIdRepository
  ) {}

  async execute(query: FindModuleVideoByIdQuery): Promise<ModuleVideoModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const moduleVideo = await this.findModuleVideoByIdRepository.execute(id);
    if (!moduleVideo) {
      throw new ModuleVideoNotFoundException();
    }
    return moduleVideo;
  }
}
