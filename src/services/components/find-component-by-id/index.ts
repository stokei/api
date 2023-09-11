import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ComponentModel } from '@/models/component.model';
import { FindComponentByIdQuery } from '@/queries/implements/components/find-component-by-id.query';

@Injectable()
export class FindComponentByIdService
  implements IBaseService<string, Promise<ComponentModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ComponentModel> {
    return await this.queryBus.execute(new FindComponentByIdQuery(data));
  }
}
