import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllLanguagesService } from '@/services/languages/find-all-languages';

@Injectable({ scope: Scope.REQUEST })
export class LanguagesLoader {
  constructor(private readonly languagesService: FindAllLanguagesService) {}

  readonly findByIds = new DataLoader(async (languageIds: string[]) => {
    const languages = await this.languagesService.execute({
      where: {
        AND: {
          ids: languageIds
        }
      }
    });
    const languagesMap = new Map(
      languages?.items?.map((language) => [language.id, language])
    );
    return languageIds.map((languageId) => languagesMap.get(languageId));
  });
}
