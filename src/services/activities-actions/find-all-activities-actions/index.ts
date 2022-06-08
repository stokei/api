import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ActivitiesActionModel } from '@/models/activities-action.model';
import { FindAllActivitiesActionsDTO } from '@/dtos/activities-actions/find-all-activities-actions.dto';
import { FindAllActivitiesActionsQuery } from '@/queries/implements/activities-actions/find-all-activities-actions.query';

@Injectable()
export class FindAllActivitiesActionsService
  implements
    IBaseService<
      FindAllActivitiesActionsDTO,
      Promise<IPaginatedType<ActivitiesActionModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllActivitiesActionsDTO
  ): Promise<IPaginatedType<ActivitiesActionModel>> {
    return await this.queryBus.execute(new FindAllActivitiesActionsQuery(data));
  }
}
