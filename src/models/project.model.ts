import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProjectCreatedEvent } from '@/events/implements/projects/project-created.event';
import { ProjectRemovedEvent } from '@/events/implements/projects/project-removed.event';
import { ProjectUpdatedEvent } from '@/events/implements/projects/project-updated.event';

export interface IProjectModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ProjectModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IProjectModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PROJECTS,
      module: ServerStokeiApiIdPrefix.PROJECTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdProject() {
    if (this.id) {
      this.apply(
        new ProjectCreatedEvent({
          project: this
        })
      );
    }
  }

  updatedProject() {
    if (this.id) {
      this.apply(
        new ProjectUpdatedEvent({
          project: this
        })
      );
    }
  }

  removedProject() {
    if (this.id) {
      this.apply(
        new ProjectRemovedEvent({
          project: this
        })
      );
    }
  }
}
