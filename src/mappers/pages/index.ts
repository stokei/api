import { convertToISODateString } from '@stokei/nestjs';

import { PageEntity } from '@/entities';
import { PageModel } from '@/models/page.model';

export class PageMapper {
  toModel(page: PageEntity) {
    return (
      page &&
      new PageModel({
        ...page,
        updatedAt: convertToISODateString(page.updatedAt),
        createdAt: convertToISODateString(page.createdAt)
      })
    );
  }
  toModels(pages: PageEntity[]) {
    return pages?.length > 0 ? pages.map(this.toModel).filter(Boolean) : [];
  }
}
