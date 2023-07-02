import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateVideoViewRepositoryDTO } from '@/dtos/video-views/create-video-view-repository.dto';
import { VideoViewMapper } from '@/mappers/video-views';
import { VideoViewModel } from '@/models/video-view.model';

@Injectable()
export class CreateVideoViewRepository
  implements
    IBaseRepository<CreateVideoViewRepositoryDTO, Promise<VideoViewModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateVideoViewRepositoryDTO): Promise<VideoViewModel> {
    return new VideoViewMapper().toModel(
      await this.model.videoView.create({ data })
    );
  }
}
