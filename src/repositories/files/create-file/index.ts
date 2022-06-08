import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { FileMapper } from '@/mappers/files';
import { CreateFileDTO } from '@/dtos/files/create-file.dto';
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
