import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ActivateVideoRepositoryDTO } from '@/dtos/videos/activate-video-repository.dto';

@Injectable()
export class ActivateVideoRepository
  implements IBaseRepository<ActivateVideoRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: ActivateVideoRepositoryDTO): Promise<boolean> {
    const updated = await this.model.video.update({
      where: {
        id: where?.video
      },
      data
    });
    return !!updated;
  }
}
