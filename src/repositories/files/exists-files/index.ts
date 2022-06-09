import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsFilesDTO } from '@/dtos/files/exists-files.dto';

@Injectable()
export class ExistsFilesRepository
  implements IBaseRepository<ExistsFilesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsFilesDTO): Promise<boolean> {
    return (await this.model.file.count({ where })) > 0;
  }
}
