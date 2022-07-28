import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllLanguagesDTO } from '@/dtos/languages/find-all-languages.dto';
import { LanguageMapper } from '@/mappers/languages';
import { LanguageModel } from '@/models/language.model';

@Injectable()
export class FindAllLanguagesRepository
  implements IBaseRepository<FindAllLanguagesDTO, Promise<LanguageModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllLanguagesDTO): Promise<LanguageModel[]> {
    const languageMapper = new LanguageMapper();
    return languageMapper.toModels(
      await this.model.language.findMany(languageMapper.toFindAllPrisma(data))
    );
  }
}
