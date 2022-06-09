import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateFileDTO } from '@/dtos/files/create-file.dto';
import { FileMapper } from '@/mappers/files';
import { FileModel } from '@/models/file.model';

@Injectable()
export class CreateFileRepository
  implements IBaseRepository<CreateFileDTO, Promise<FileModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateFileDTO): Promise<FileModel> {
    return new FileMapper().toModel(await this.model.file.create({ data }));
  }
}
