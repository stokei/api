import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ActivitiesActionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ActivitiesActionModel } from '@/models/activities-action.model';
import { FindActivitiesActionByIdRepository } from '@/repositories/activities-actions/find-activities-action-by-id';
import { FindActivitiesActionByIdQuery } from '@/queries/implements/activities-actions/find-activities-action-by-id.query';

@QueryHandler(FindActivitiesActionByIdQuery)
export class FindActivitiesActionByIdQueryHandler
  implements IQueryHandler<FindActivitiesActionByIdQuery>
{
  constructor(
    private readonly findActivitiesActionByIdRepository: FindActivitiesActionByIdRepository
  ) {}

  async execute(
    query: FindActivitiesActionByIdQuery
  ): Promise<ActivitiesActionModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const activitiesAction =
      await this.findActivitiesActionByIdRepository.execute(id);
    if (!activitiesAction) {
      throw new ActivitiesActionNotFoundException();
    }
    return activitiesAction;
  }
}
