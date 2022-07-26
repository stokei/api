import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllAppsDTO } from '@/dtos/apps/find-all-apps.dto';
import { AppModel } from '@/models/app.model';
import { FindAllAppsQuery } from '@/queries/implements/apps/find-all-apps.query';

@Injectable()
export class FindAllAppsService
  implements IBaseService<FindAllAppsDTO, Promise<IPaginatedType<AppModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllAppsDTO): Promise<IPaginatedType<AppModel>> {
    return await this.queryBus.execute(new FindAllAppsQuery(data));
  }
}
