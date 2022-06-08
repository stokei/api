import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsVideosDTO } from '@/dtos/videos/exists-videos.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsVideosRepository
  implements IBaseRepository<ExistsVideosDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsVideosDTO): Promise<boolean> {
    return (await this.model.video.count({ where })) > 0;
  }
}
