import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IBaseService } from '@stokei/nestjs';

import { defaultAccountId } from '@/constants/default-account-id';
import { CreateLanguageDTO } from '@/dtos/languages/create-language.dto';
import { LanguageModel } from '@/models/language.model';
import { CreateLanguageService } from '@/services/languages/create-language';
import { FindAllLanguagesService } from '@/services/languages/find-all-languages';

type LanguageDataDTO = CreateLanguageDTO;

@Injectable()
export class LanguagesSeeds
  implements IBaseService<any, Promise<LanguageModel[]>>
{
  constructor(
    private readonly createLanguageService: CreateLanguageService,
    private readonly findAllLanguagesService: FindAllLanguagesService
  ) {}

  async execute(): Promise<LanguageModel[]> {
    const languagesData = this.createData();
    const languagesIds = languagesData.map((language) => language.id);
    const languagesFounded = await this.findAllLanguagesService.execute({
      where: {
        AND: {
          ids: languagesIds
        }
      }
    });
    let languagesToCreate = languagesData;
    if (languagesFounded?.items?.length > 0) {
      languagesToCreate = languagesData?.filter((language) => {
        const existsLanguage = languagesFounded?.items?.find(
          (languageFounded) => languageFounded.id === language.id
        );
        return !existsLanguage;
      });
    }
    const prismaClient = new PrismaClient();
    const languagesCreated = await Promise.all(
      languagesToCreate?.map(async (languageData) => {
        const language = await this.createLanguageService.execute(languageData);
        return language;
      })
    );
    prismaClient.$disconnect();
    return [...languagesFounded?.items, ...languagesCreated];
  }

  private createData(): LanguageDataDTO[] {
    return [
      {
        id: 'pt-br',
        name: 'Português - BR',
        createdBy: defaultAccountId
      }
    ];
  }
}
