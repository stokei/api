import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ActivityModel } from '@/models/activity.model';
import { FindActivityByIdQuery } from '@/queries/implements/activities/find-activity-by-id.query';

@Injectable()
export class FindActivityByIdService
  implements IBaseService<string, Promise<ActivityModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ActivityModel> {
    return await this.queryBus.execute(new FindActivityByIdQuery(data));
  }
}
