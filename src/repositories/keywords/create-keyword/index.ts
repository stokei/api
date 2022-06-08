import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { KeywordMapper } from '@/mappers/keywords';
import { CreateKeywordDTO } from '@/dtos/keywords/create-keyword.dto';
import { KeywordModel } from '@/models/keyword.model';

@Injectable()
export class CreateKeywordRepository
  implements IBaseRepository<CreateKeywordDTO, Promise<KeywordModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateKeywordDTO): Promise<KeywordModel> {
    return new KeywordMapper().toModel(
      await this.model.keyword.create({ data })
    );
  }
}
