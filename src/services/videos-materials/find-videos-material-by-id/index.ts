import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { VideosMaterialModel } from '@/models/videos-material.model';
import { FindVideosMaterialByIdQuery } from '@/queries/implements/videos-materials/find-videos-material-by-id.query';

@Injectable()
export class FindVideosMaterialByIdService
  implements IBaseService<string, Promise<VideosMaterialModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<VideosMaterialModel> {
    return await this.queryBus.execute(new FindVideosMaterialByIdQuery(data));
  }
}
