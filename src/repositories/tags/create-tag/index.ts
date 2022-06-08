import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { TagMapper } from '@/mappers/tags';
import { CreateTagDTO } from '@/dtos/tags/create-tag.dto';
import { TagModel } from '@/models/tag.model';

@Injectable()
export class CreateTagRepository
  implements IBaseRepository<CreateTagDTO, Promise<TagModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateTagDTO): Promise<TagModel> {
    return new TagMapper().toModel(await this.model.tag.create({ data }));
  }
}
