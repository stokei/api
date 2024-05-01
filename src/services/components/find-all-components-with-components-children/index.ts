import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindAllComponentsWithComponentsChildrenDTO } from '@/dtos/components/find-all-components-with-components-children.dto';
import { ComponentModel } from '@/models/component.model';
import { FindAllComponentsWithComponentsChildrenQuery } from '@/queries/implements/components/find-all-components-with-components-children.query';

@Injectable()
export class FindAllComponentsWithComponentsChildrenService
  implements
    IBaseService<
      FindAllComponentsWithComponentsChildrenDTO,
      Promise<ComponentModel[]>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllComponentsWithComponentsChildrenDTO
  ): Promise<ComponentModel[]> {
    return await this.queryBus.execute(
      new FindAllComponentsWithComponentsChildrenQuery(data)
    );
  }
}
