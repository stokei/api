import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  VideosMaterialNotFoundException
} from '@/errors';
import { VideosMaterialModel } from '@/models/videos-material.model';
import { FindVideosMaterialByIdQuery } from '@/queries/implements/videos-materials/find-videos-material-by-id.query';
import { FindVideosMaterialByIdRepository } from '@/repositories/videos-materials/find-videos-material-by-id';

@QueryHandler(FindVideosMaterialByIdQuery)
export class FindVideosMaterialByIdQueryHandler
  implements IQueryHandler<FindVideosMaterialByIdQuery>
{
  constructor(
    private readonly findVideosMaterialByIdRepository: FindVideosMaterialByIdRepository
  ) {}

  async execute(
    query: FindVideosMaterialByIdQuery
  ): Promise<VideosMaterialModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const videosMaterial = await this.findVideosMaterialByIdRepository.execute(
      id
    );
    if (!videosMaterial) {
      throw new VideosMaterialNotFoundException();
    }
    return videosMaterial;
  }
}
