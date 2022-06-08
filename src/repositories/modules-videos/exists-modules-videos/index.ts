import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsModulesVideosDTO } from '@/dtos/modules-videos/exists-modules-videos.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsModulesVideosRepository
  implements IBaseRepository<ExistsModulesVideosDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsModulesVideosDTO): Promise<boolean> {
    return (await this.model.modulesVideo.count({ where })) > 0;
  }
}
