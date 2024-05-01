import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllComponentsDTO } from '@/dtos/components/find-all-components.dto';
import { ComponentModel } from '@/models/component.model';
import { FindAllComponentsQuery } from '@/queries/implements/components/find-all-components.query';

@Injectable()
export class FindAllComponentsService
  implements
    IBaseService<FindAllComponentsDTO, Promise<IPaginatedType<ComponentModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllComponentsDTO
  ): Promise<IPaginatedType<ComponentModel>> {
    return await this.queryBus.execute(new FindAllComponentsQuery(data));
  }
}
