import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { VideoViewMapper } from '@/mappers/video-views';
import { VideoViewModel } from '@/models/video-view.model';

@Injectable()
export class FindVideoViewByIdRepository
  implements IBaseRepository<string, Promise<VideoViewModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<VideoViewModel> {
    return new VideoViewMapper().toModel(
      await this.model.videoView.findUnique({
        where: { id }
      })
    );
  }
}
