import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ComponentModel } from '@/models/component.model';
import { FindAllComponentsWithComponentsChildrenQuery } from '@/queries/implements/components/find-all-components-with-components-children.query';
import { FindAllComponentsWithComponentsChildrenRepository } from '@/repositories/components/find-all-components-with-components-children';

@QueryHandler(FindAllComponentsWithComponentsChildrenQuery)
export class FindAllComponentsWithComponentsChildrenQueryHandler
  implements IQueryHandler<FindAllComponentsWithComponentsChildrenQuery>
{
  constructor(
    private readonly findAllComponentsWithComponentsChildrenRepository: FindAllComponentsWithComponentsChildrenRepository
  ) {}

  async execute(
    query: FindAllComponentsWithComponentsChildrenQuery
  ): Promise<ComponentModel[]> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.cleanData(query);
    return await this.findAllComponentsWithComponentsChildrenRepository.execute(
      data
    );
  }

  private cleanData(
    query: FindAllComponentsWithComponentsChildrenQuery
  ): FindAllComponentsWithComponentsChildrenQuery {
    return cleanObject({
      app: cleanValue(query?.app),
      parent: cleanValue(query?.parent)
    });
  }
}
