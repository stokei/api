import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { AppModel } from '@/models/app.model';
import { FindAppCurrentPlanQuery } from '@/queries/implements/apps/find-app-current-plan.query';

@Injectable()
export class FindAppCurrentPlanService
  implements IBaseService<string, Promise<AppModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(appId: string): Promise<AppModel> {
    return await this.queryBus.execute(new FindAppCurrentPlanQuery(appId));
  }
}
