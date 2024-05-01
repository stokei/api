import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountVersionsDTO } from '@/dtos/versions/count-versions.dto';
import { VersionMapper } from '@/mappers/versions';

@Injectable()
export class CountVersionsRepository
  implements IBaseRepository<CountVersionsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountVersionsDTO): Promise<number> {
    const versionMapper = new VersionMapper();
    return await this.model.version.count({
      where: versionMapper.toWhereFindAllPrisma(where)
    });
  }
}
