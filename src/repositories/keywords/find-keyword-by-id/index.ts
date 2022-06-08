import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { KeywordMapper } from '@/mappers/keywords';
import { KeywordModel } from '@/models/keyword.model';

@Injectable()
export class FindKeywordByIdRepository
  implements IBaseRepository<string, Promise<KeywordModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<KeywordModel> {
    return new KeywordMapper().toModel(
      await this.model.keyword.findUnique({
        where: { id }
      })
    );
  }
}
