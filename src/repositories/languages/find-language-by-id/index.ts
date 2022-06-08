import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { LanguageMapper } from '@/mappers/languages';
import { LanguageModel } from '@/models/language.model';

@Injectable()
export class FindLanguageByIdRepository
  implements IBaseRepository<string, Promise<LanguageModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<LanguageModel> {
    return new LanguageMapper().toModel(
      await this.model.language.findUnique({
        where: { id }
      })
    );
  }
}
