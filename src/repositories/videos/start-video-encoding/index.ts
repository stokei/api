import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { StartVideoEncodingRepositoryDTO } from '@/dtos/videos/start-video-encoding-repository.dto';

@Injectable()
export class StartVideoEncodingRepository
  implements IBaseRepository<StartVideoEncodingRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: StartVideoEncodingRepositoryDTO): Promise<boolean> {
    const updated = await this.model.video.update({
      where: {
        id: where?.video
      },
      data
    });
    return !!updated;
  }
}
