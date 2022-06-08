import { Injectable, Scope } from '@nestjs/common';
import { FindAllActivitiesService } from '@/services/activities/find-all-activities';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ActivitiesLoader {
  constructor(private readonly activitiesService: FindAllActivitiesService) {}

  readonly findByIds = new DataLoader(async (activityIds: string[]) => {
    const activities = await this.activitiesService.execute({
      where: {
        AND: {
          ids: activityIds
        }
      }
    });
    const activitiesMap = new Map(
      activities?.items?.map((activity) => [activity.id, activity])
    );
    return activityIds.map((activityId) => activitiesMap.get(activityId));
  });
}
