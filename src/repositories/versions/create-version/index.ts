import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateVersionRepositoryDTO } from '@/dtos/versions/create-version-repository.dto';
import { VersionMapper } from '@/mappers/versions';
import { VersionModel } from '@/models/version.model';

@Injectable()
export class CreateVersionRepository
  implements IBaseRepository<CreateVersionRepositoryDTO, Promise<VersionModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateVersionRepositoryDTO): Promise<VersionModel> {
    return new VersionMapper().toModel(
      await this.model.version.create({ data })
    );
  }
}
