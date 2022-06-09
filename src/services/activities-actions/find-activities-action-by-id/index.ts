import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ActivitiesActionModel } from '@/models/activities-action.model';
import { FindActivitiesActionByIdQuery } from '@/queries/implements/activities-actions/find-activities-action-by-id.query';

@Injectable()
export class FindActivitiesActionByIdService
  implements IBaseService<string, Promise<ActivitiesActionModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ActivitiesActionModel> {
    return await this.queryBus.execute(new FindActivitiesActionByIdQuery(data));
  }
}
