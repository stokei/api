import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllVersionsDTO } from '@/dtos/versions/find-all-versions.dto';
import { VersionMapper } from '@/mappers/versions';
import { VersionModel } from '@/models/version.model';

@Injectable()
export class FindAllVersionsRepository
  implements IBaseRepository<FindAllVersionsDTO, Promise<VersionModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllVersionsDTO): Promise<VersionModel[]> {
    const versionMapper = new VersionMapper();
    return versionMapper.toModels(
      await this.model.version.findMany(versionMapper.toFindAllPrisma(data))
    );
  }
}
