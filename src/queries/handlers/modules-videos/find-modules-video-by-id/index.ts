import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ModulesVideoNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ModulesVideoModel } from '@/models/modules-video.model';
import { FindModulesVideoByIdQuery } from '@/queries/implements/modules-videos/find-modules-video-by-id.query';
import { FindModulesVideoByIdRepository } from '@/repositories/modules-videos/find-modules-video-by-id';

@QueryHandler(FindModulesVideoByIdQuery)
export class FindModulesVideoByIdQueryHandler
  implements IQueryHandler<FindModulesVideoByIdQuery>
{
  constructor(
    private readonly findModulesVideoByIdRepository: FindModulesVideoByIdRepository
  ) {}

  async execute(query: FindModulesVideoByIdQuery): Promise<ModulesVideoModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const modulesVideo = await this.findModulesVideoByIdRepository.execute(id);
    if (!modulesVideo) {
      throw new ModulesVideoNotFoundException();
    }
    return modulesVideo;
  }
}
