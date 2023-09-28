import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanSlug } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  SiteNotFoundException
} from '@/errors';
import { SiteModel } from '@/models/site.model';
import { FindSiteBySlugQuery } from '@/queries/implements/sites/find-site-by-slug.query';
import { FindSiteBySlugRepository } from '@/repositories/sites/find-site-by-slug';

@QueryHandler(FindSiteBySlugQuery)
export class FindSiteBySlugQueryHandler
  implements IQueryHandler<FindSiteBySlugQuery>
{
  constructor(
    private readonly findSiteBySlugRepository: FindSiteBySlugRepository
  ) {}

  async execute(query: FindSiteBySlugQuery): Promise<SiteModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const slug = cleanSlug(query.slug);
    if (!slug) {
      throw new ParamNotFoundException('slug');
    }

    const site = await this.findSiteBySlugRepository.execute(slug);
    if (!site) {
      throw new SiteNotFoundException();
    }
    return site;
  }
}
