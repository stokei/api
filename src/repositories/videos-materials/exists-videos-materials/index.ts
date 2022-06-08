import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsVideosMaterialsDTO } from '@/dtos/videos-materials/exists-videos-materials.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsVideosMaterialsRepository
  implements IBaseRepository<ExistsVideosMaterialsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsVideosMaterialsDTO): Promise<boolean> {
    return (await this.model.videosMaterial.count({ where })) > 0;
  }
}
