import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ComponentMapper } from '@/mappers/components';
import { ComponentModel } from '@/models/component.model';
import { FindAllComponentsQuery } from '@/queries/implements/components/find-all-components.query';
import { CountComponentsRepository } from '@/repositories/components/count-components';
import { FindAllComponentsRepository } from '@/repositories/components/find-all-components';

@QueryHandler(FindAllComponentsQuery)
export class FindAllComponentsQueryHandler
  implements IQueryHandler<FindAllComponentsQuery>
{
  constructor(
    private readonly findAllComponentRepository: FindAllComponentsRepository,
    private readonly countComponentsRepository: CountComponentsRepository
  ) {}

  async execute(
    query: FindAllComponentsQuery
  ): Promise<IPaginatedType<ComponentModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new ComponentMapper().toFindAllQueryClean(query);
    const components = await this.findAllComponentRepository.execute(data);
    const totalCount = await this.countComponentsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ComponentModel>().toPaginationList({
      items: components,
      page: data.page,
      totalCount
    });
  }
}
