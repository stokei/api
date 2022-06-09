import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllActivitiesActionsService } from '@/services/activities-actions/find-all-activities-actions';

@Injectable({ scope: Scope.REQUEST })
export class ActivitiesActionsLoader {
  constructor(
    private readonly activitiesActionsService: FindAllActivitiesActionsService
  ) {}

  readonly findByIds = new DataLoader(async (activitiesActionIds: string[]) => {
    const activitiesActions = await this.activitiesActionsService.execute({
      where: {
        AND: {
          ids: activitiesActionIds
        }
      }
    });
    const activitiesActionsMap = new Map(
      activitiesActions?.items?.map((activitiesAction) => [
        activitiesAction.id,
        activitiesAction
      ])
    );
    return activitiesActionIds.map((activitiesActionId) =>
      activitiesActionsMap.get(activitiesActionId)
    );
  });
}
