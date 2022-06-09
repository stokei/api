import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateVersionDTO } from '@/dtos/versions/create-version.dto';
import { VersionMapper } from '@/mappers/versions';
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
