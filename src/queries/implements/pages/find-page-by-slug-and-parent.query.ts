import { IQuery } from '@nestjs/cqrs';

import { FindPageBySlugAndParentDTO } from '@/dtos/pages/find-page-by-slug-and-parent.dto';

export class FindPageBySlugAndParentQuery
  implements IQuery, FindPageBySlugAndParentDTO
{
  parent: string;
  slug: string;

  constructor(data: FindPageBySlugAndParentDTO) {
    this.parent = data.parent;
    this.slug = data.slug;
  }
}
