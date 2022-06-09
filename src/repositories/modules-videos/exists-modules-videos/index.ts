import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsModulesVideosDTO } from '@/dtos/modules-videos/exists-modules-videos.dto';

@Injectable()
export class ExistsModulesVideosRepository
  implements IBaseRepository<ExistsModulesVideosDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsModulesVideosDTO): Promise<boolean> {
    return (await this.model.modulesVideo.count({ where })) > 0;
  }
}
