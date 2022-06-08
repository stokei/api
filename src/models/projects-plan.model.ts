import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProjectsPlanCreatedEvent } from '@/events/implements/projects-plans/projects-plan-created.event';
import { ProjectsPlanUpdatedEvent } from '@/events/implements/projects-plans/projects-plan-updated.event';
import { ProjectsPlanRemovedEvent } from '@/events/implements/projects-plans/projects-plan-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IProjectsPlanModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ProjectsPlanModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IProjectsPlanModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PROJECTS_PLANS,
      module: ServerStokeiApiIdPrefix.PROJECTS_PLANS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdProjectsPlan() {
    if (this.id) {
      this.apply(
        new ProjectsPlanCreatedEvent({
          projectsPlan: this
        })
      );
    }
  }

  updatedProjectsPlan() {
    if (this.id) {
      this.apply(
        new ProjectsPlanUpdatedEvent({
          projectsPlan: this
        })
      );
    }
  }

  removedProjectsPlan() {
    if (this.id) {
      this.apply(
        new ProjectsPlanRemovedEvent({
          projectsPlan: this
        })
      );
    }
  }
}
