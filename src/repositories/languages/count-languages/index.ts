import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountLanguagesDTO } from '@/dtos/languages/count-languages.dto';
import { LanguageMapper } from '@/mappers/languages';

@Injectable()
export class CountLanguagesRepository
  implements IBaseRepository<CountLanguagesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountLanguagesDTO): Promise<number> {
    const languageMapper = new LanguageMapper();
    return await this.model.language.count({
      where: languageMapper.toWhereFindAllPrisma(where)
    });
  }
}
