import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { ComponentModel } from '@/models/component.model';
import { FindAllComponentsByParentIdsQuery } from '@/queries/implements/components/find-all-components-by-parent-ids.query';
import { FindAllComponentsByParentIdsRepository } from '@/repositories/components/find-all-components-by-parent-ids';

@QueryHandler(FindAllComponentsByParentIdsQuery)
export class FindAllComponentsByParentIdsQueryHandler
  implements IQueryHandler<FindAllComponentsByParentIdsQuery>
{
  constructor(
    private readonly findAllComponentsByParentIdsRepository: FindAllComponentsByParentIdsRepository
  ) {}

  async execute(
    query: FindAllComponentsByParentIdsQuery
  ): Promise<ComponentModel[]> {
    if (!query?.parentIds) {
      throw new DataNotFoundException();
    }

    const ids = query?.parentIds?.map((id) => cleanValue(id));
    if (!ids) {
      throw new ParamNotFoundException('id');
    }

    try {
      const components =
        await this.findAllComponentsByParentIdsRepository.execute(ids);
      return components;
    } catch (error) {
      return [];
    }
  }
}
