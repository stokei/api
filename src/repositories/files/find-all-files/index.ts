import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllFilesDTO } from '@/dtos/files/find-all-files.dto';
import { FileMapper } from '@/mappers/files';
import { FileModel } from '@/models/file.model';

@Injectable()
export class FindAllFilesRepository
  implements IBaseRepository<FindAllFilesDTO, Promise<FileModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllFilesDTO): Promise<FileModel[]> {
    const fileMapper = new FileMapper();
    return fileMapper.toModels(
      await this.model.file.findMany(fileMapper.toFindAllPrisma(data))
    );
  }
}
