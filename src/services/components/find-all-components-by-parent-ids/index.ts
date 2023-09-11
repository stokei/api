import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ComponentModel } from '@/models/component.model';
import { FindAllComponentsByParentIdsQuery } from '@/queries/implements/components/find-all-components-by-parent-ids.query';

@Injectable()
export class FindAllComponentsByParentIdsService
  implements IBaseService<string[], Promise<ComponentModel[]>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(parentIds: string[]): Promise<ComponentModel[]> {
    return await this.queryBus.execute(
      new FindAllComponentsByParentIdsQuery(parentIds)
    );
  }
}
