import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { VersionMapper } from '@/mappers/versions';
import { CreateVersionDTO } from '@/dtos/versions/create-version.dto';
import { VersionModel } from '@/models/version.model';

@Injectable()
export class CreateVersionRepository
  implements IBaseRepository<CreateVersionDTO, Promise<VersionModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateVersionDTO): Promise<VersionModel> {
    return new VersionMapper().toModel(
      await this.model.version.create({ data })
    );
  }
}
