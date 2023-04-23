import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateFileRepositoryDTO } from '@/dtos/files/create-file-repository.dto';
import { FileMapper } from '@/mappers/files';
import { FileModel } from '@/models/file.model';

@Injectable()
export class CreateFileRepository
  implements IBaseRepository<CreateFileRepositoryDTO, Promise<FileModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateFileRepositoryDTO): Promise<FileModel> {
    return new FileMapper().toModel(await this.model.file.create({ data }));
  }
}
