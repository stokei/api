import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllKeywordsService } from '@/services/keywords/find-all-keywords';

@Injectable({ scope: Scope.REQUEST })
export class KeywordsLoader {
  constructor(private readonly keywordsService: FindAllKeywordsService) {}

  readonly findByIds = new DataLoader(async (keywordIds: string[]) => {
    const keywords = await this.keywordsService.execute({
      where: {
        AND: {
          ids: keywordIds
        }
      }
    });
    const keywordsMap = new Map(
      keywords?.items?.map((keyword) => [keyword.id, keyword])
    );
    return keywordIds.map((keywordId) => keywordsMap.get(keywordId));
  });
}
