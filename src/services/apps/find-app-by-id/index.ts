import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { AppModel } from '@/models/app.model';
import { FindAppByIdQuery } from '@/queries/implements/apps/find-app-by-id.query';

@Injectable()
export class FindAppByIdService
  implements IBaseService<string, Promise<AppModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<AppModel> {
    return await this.queryBus.execute(new FindAppByIdQuery(data));
  }
}
