import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { MetatagMapper } from '@/mappers/metatags';
import { CreateMetatagDTO } from '@/dtos/metatags/create-metatag.dto';
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
