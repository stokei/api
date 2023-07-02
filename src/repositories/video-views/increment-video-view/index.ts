import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { IncrementVideoViewRepositoryDTO } from '@/dtos/video-views/increment-video-view-repository.dto';

@Injectable()
export class IncrementVideoViewRepository
  implements IBaseRepository<IncrementVideoViewRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: IncrementVideoViewRepositoryDTO): Promise<boolean> {
    const updated = await this.model.videoView.update({
      where: {
        id: data.videoView
      },
      data: {
        viewedDuration: {
          increment: data.viewedDuration
        }
      }
    });
    return !!updated;
  }
}
