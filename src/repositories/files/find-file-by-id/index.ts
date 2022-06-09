import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FileMapper } from '@/mappers/files';
import { FileModel } from '@/models/file.model';

@Injectable()
export class FindFileByIdRepository
  implements IBaseRepository<string, Promise<FileModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<FileModel> {
    return new FileMapper().toModel(
      await this.model.file.findUnique({
        where: { id }
      })
    );
  }
}
