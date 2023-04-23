import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountFilesDTO } from '@/dtos/files/count-files.dto';
import { FileMapper } from '@/mappers/files';

@Injectable()
export class CountFilesRepository
  implements IBaseRepository<CountFilesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountFilesDTO): Promise<number> {
    const fileMapper = new FileMapper();
    return await this.model.file.count({
      where: fileMapper.toWhereFindAllPrisma(where)
    });
  }
}
