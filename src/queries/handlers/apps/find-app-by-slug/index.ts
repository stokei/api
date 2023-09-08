import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { AppModel } from '@/models/app.model';
import { FindAppBySlugQuery } from '@/queries/implements/apps/find-app-by-slug.query';
import { FindAppBySlugRepository } from '@/repositories/apps/find-app-by-slug';

@QueryHandler(FindAppBySlugQuery)
export class FindAppBySlugQueryHandler
  implements IQueryHandler<FindAppBySlugQuery>
{
  constructor(
    private readonly findAppBySlugRepository: FindAppBySlugRepository
  ) {}

  async execute(query: FindAppBySlugQuery): Promise<AppModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const slug = cleanValue(query.slug);
    if (!slug) {
      throw new ParamNotFoundException('slug');
    }

    const app = await this.findAppBySlugRepository.execute(slug);
    if (!app) {
      throw new AppNotFoundException();
    }
    return app;
  }
}
