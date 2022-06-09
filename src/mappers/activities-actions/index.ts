import { convertToISODateString } from '@stokei/nestjs';

import { ActivitiesActionEntity } from '@/entities';
import { ActivitiesActionModel } from '@/models/activities-action.model';

export class ActivitiesActionMapper {
  toModel(activitiesAction: ActivitiesActionEntity) {
    return (
      activitiesAction &&
      new ActivitiesActionModel({
        ...activitiesAction,
        updatedAt: convertToISODateString(activitiesAction.updatedAt),
        createdAt: convertToISODateString(activitiesAction.createdAt)
      })
    );
  }
  toModels(activitiesActions: ActivitiesActionEntity[]) {
    return activitiesActions?.length > 0
      ? activitiesActions.map(this.toModel).filter(Boolean)
      : [];
  }
}
