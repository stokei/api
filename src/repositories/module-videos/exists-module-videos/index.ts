import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsModuleVideosDTO } from '@/dtos/module-videos/exists-module-videos.dto';

@Injectable()
export class ExistsModuleVideosRepository
  implements IBaseRepository<ExistsModuleVideosDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsModuleVideosDTO): Promise<boolean> {
    return (await this.model.moduleVideo.count({ where })) > 0;
  }
}
