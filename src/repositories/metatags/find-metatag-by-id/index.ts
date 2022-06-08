import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { MetatagMapper } from '@/mappers/metatags';
import { MetatagModel } from '@/models/metatag.model';

@Injectable()
export class FindMetatagByIdRepository
  implements IBaseRepository<string, Promise<MetatagModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<MetatagModel> {
    return new MetatagMapper().toModel(
      await this.model.metatag.findUnique({
        where: { id }
      })
    );
  }
}
