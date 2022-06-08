import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { VersionMapper } from '@/mappers/versions';
import { VersionModel } from '@/models/version.model';

@Injectable()
export class FindVersionByIdRepository
  implements IBaseRepository<string, Promise<VersionModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<VersionModel> {
    return new VersionMapper().toModel(
      await this.model.version.findUnique({
        where: { id }
      })
    );
  }
}
