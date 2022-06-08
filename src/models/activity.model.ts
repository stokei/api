import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ActivityCreatedEvent } from '@/events/implements/activities/activity-created.event';
import { ActivityUpdatedEvent } from '@/events/implements/activities/activity-updated.event';
import { ActivityRemovedEvent } from '@/events/implements/activities/activity-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IActivityModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ActivityModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IActivityModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ACTIVITIES,
      module: ServerStokeiApiIdPrefix.ACTIVITIES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdActivity() {
    if (this.id) {
      this.apply(
        new ActivityCreatedEvent({
          activity: this
        })
      );
    }
  }

  updatedActivity() {
    if (this.id) {
      this.apply(
        new ActivityUpdatedEvent({
          activity: this
        })
      );
    }
  }

  removedActivity() {
    if (this.id) {
      this.apply(
        new ActivityRemovedEvent({
          activity: this
        })
      );
    }
  }
}
