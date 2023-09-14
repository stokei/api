import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindAllComponentsTreeDTO } from '@/dtos/components/find-all-components-tree.dto';
import { ComponentModel } from '@/models/component.model';
import { FindAllComponentsTreeQuery } from '@/queries/implements/components/find-all-components-tree.query';

@Injectable()
export class FindAllComponentsTreeService
  implements IBaseService<FindAllComponentsTreeDTO, Promise<ComponentModel[]>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllComponentsTreeDTO): Promise<ComponentModel[]> {
    return await this.queryBus.execute(new FindAllComponentsTreeQuery(data));
  }
}
