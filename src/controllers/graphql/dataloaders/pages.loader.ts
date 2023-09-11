import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllPagesService } from '@/services/pages/find-all-pages';

@Injectable({ scope: Scope.REQUEST })
export class PagesLoader {
  constructor(private readonly pagesService: FindAllPagesService) {}

  readonly findByIds = new DataLoader(async (pageIds: string[]) => {
    const pages = await this.pagesService.execute({
      where: {
        AND: {
          ids: pageIds
        }
      }
    });
    const pagesMap = new Map(pages?.items?.map((page) => [page.id, page]));
    return pageIds.map((pageId) => pagesMap.get(pageId));
  });
}
