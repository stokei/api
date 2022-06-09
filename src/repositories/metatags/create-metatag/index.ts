import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateMetatagDTO } from '@/dtos/metatags/create-metatag.dto';
import { MetatagMapper } from '@/mappers/metatags';
import { MetatagModel } from '@/models/metatag.model';

@Injectable()
export class CreateMetatagRepository
  implements IBaseRepository<CreateMetatagDTO, Promise<MetatagModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateMetatagDTO): Promise<MetatagModel> {
    return new MetatagMapper().toModel(
      await this.model.metatag.create({ data })
    );
  }
}
