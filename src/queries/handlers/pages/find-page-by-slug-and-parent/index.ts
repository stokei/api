import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanSlug, cleanValue } from '@stokei/nestjs';

import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { PageModel } from '@/models/page.model';
import { FindPageBySlugAndParentQuery } from '@/queries/implements/pages/find-page-by-slug-and-parent.query';
import { FindPageBySlugAndParentRepository } from '@/repositories/pages/find-page-by-slug-and-parent';

@QueryHandler(FindPageBySlugAndParentQuery)
export class FindPageBySlugAndParentQueryHandler
  implements IQueryHandler<FindPageBySlugAndParentQuery>
{
  constructor(
    private readonly findPageBySlugAndParentRepository: FindPageBySlugAndParentRepository
  ) {}

  async execute(query: FindPageBySlugAndParentQuery): Promise<PageModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const parent = cleanValue(query.parent);
    if (!parent) {
      throw new ParamNotFoundException('parent');
    }
    const slug = cleanSlug(query.slug);
    if (!slug) {
      throw new ParamNotFoundException('slug');
    }

    return await this.findPageBySlugAndParentRepository.execute({
      parent,
      slug
    });
  }
}
