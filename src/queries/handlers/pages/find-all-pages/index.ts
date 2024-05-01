import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { PageMapper } from '@/mappers/pages';
import { PageModel } from '@/models/page.model';
import { FindAllPagesQuery } from '@/queries/implements/pages/find-all-pages.query';
import { CountPagesRepository } from '@/repositories/pages/count-pages';
import { FindAllPagesRepository } from '@/repositories/pages/find-all-pages';

@QueryHandler(FindAllPagesQuery)
export class FindAllPagesQueryHandler
  implements IQueryHandler<FindAllPagesQuery>
{
  constructor(
    private readonly findAllPageRepository: FindAllPagesRepository,
    private readonly countPagesRepository: CountPagesRepository
  ) {}

  async execute(query: FindAllPagesQuery): Promise<IPaginatedType<PageModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new PageMapper().toFindAllQueryClean(query);
    const pages = await this.findAllPageRepository.execute(data);
    const totalCount = await this.countPagesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<PageModel>().toPaginationList({
      items: pages,
      page: data.page,
      totalCount
    });
  }
}
