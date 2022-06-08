import { convertToISODateString } from '@stokei/nestjs';
import { ActivityEntity } from '@/entities';
import { ActivityModel } from '@/models/activity.model';

export class ActivityMapper {
  toModel(activity: ActivityEntity) {
    return (
      activity &&
      new ActivityModel({
        ...activity,
        updatedAt: convertToISODateString(activity.updatedAt),
        createdAt: convertToISODateString(activity.createdAt)
      })
    );
  }
  toModels(activities: ActivityEntity[]) {
    return activities?.length > 0
      ? activities.map(this.toModel).filter(Boolean)
      : [];
  }
}
