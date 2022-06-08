import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ActivityNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ActivityModel } from '@/models/activity.model';
import { FindActivityByIdRepository } from '@/repositories/activities/find-activity-by-id';
import { FindActivityByIdQuery } from '@/queries/implements/activities/find-activity-by-id.query';

@QueryHandler(FindActivityByIdQuery)
export class FindActivityByIdQueryHandler
  implements IQueryHandler<FindActivityByIdQuery>
{
  constructor(
    private readonly findActivityByIdRepository: FindActivityByIdRepository
  ) {}

  async execute(query: FindActivityByIdQuery): Promise<ActivityModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const activity = await this.findActivityByIdRepository.execute(id);
    if (!activity) {
      throw new ActivityNotFoundException();
    }
    return activity;
  }
}
