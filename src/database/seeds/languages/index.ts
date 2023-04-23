import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { defaultAccountId } from '@/constants/default-account-id';
import { CreateLanguageDTO } from '@/dtos/languages/create-language.dto';
import { CreateLanguageService } from '@/services/languages/create-language';
import { FindAllLanguagesService } from '@/services/languages/find-all-languages';

import { BaseSeeds } from '../base-seeds';

type LanguageDataDTO = CreateLanguageDTO;

@Injectable()
export class LanguagesSeeds
  extends BaseSeeds
  implements IBaseService<any, Promise<void>>
{
  constructor(
    private readonly createLanguageService: CreateLanguageService,
    private readonly findAllLanguagesService: FindAllLanguagesService
  ) {
    super();
  }

  async execute(): Promise<void> {
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
    languagesToCreate?.forEach(async (languageData) => {
      const language = await this.createLanguageService.execute(languageData);
      return language;
    });
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
