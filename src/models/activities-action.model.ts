import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ActivitiesActionCreatedEvent } from '@/events/implements/activities-actions/activities-action-created.event';
import { ActivitiesActionRemovedEvent } from '@/events/implements/activities-actions/activities-action-removed.event';
import { ActivitiesActionUpdatedEvent } from '@/events/implements/activities-actions/activities-action-updated.event';

export interface IActivitiesActionModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ActivitiesActionModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IActivitiesActionModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ACTIVITIES_ACTIONS,
      module: ServerStokeiApiIdPrefix.ACTIVITIES_ACTIONS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdActivitiesAction() {
    if (this.id) {
      this.apply(
        new ActivitiesActionCreatedEvent({
          activitiesAction: this
        })
      );
    }
  }

  updatedActivitiesAction() {
    if (this.id) {
      this.apply(
        new ActivitiesActionUpdatedEvent({
          activitiesAction: this
        })
      );
    }
  }

  removedActivitiesAction() {
    if (this.id) {
      this.apply(
        new ActivitiesActionRemovedEvent({
          activitiesAction: this
        })
      );
    }
  }
}
