import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { AppModel } from '@/models/app.model';
import { FindAppBySlugQuery } from '@/queries/implements/apps/find-app-by-slug.query';

@Injectable()
export class FindAppBySlugService
  implements IBaseService<string, Promise<AppModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<AppModel> {
    return await this.queryBus.execute(new FindAppBySlugQuery(data));
  }
}
