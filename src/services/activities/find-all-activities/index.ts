import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllActivitiesDTO } from '@/dtos/activities/find-all-activities.dto';
import { ActivityModel } from '@/models/activity.model';
import { FindAllActivitiesQuery } from '@/queries/implements/activities/find-all-activities.query';

@Injectable()
export class FindAllActivitiesService
  implements
    IBaseService<FindAllActivitiesDTO, Promise<IPaginatedType<ActivityModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllActivitiesDTO
  ): Promise<IPaginatedType<ActivityModel>> {
    return await this.queryBus.execute(new FindAllActivitiesQuery(data));
  }
}
