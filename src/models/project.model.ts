import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ProjectStatus } from '@/enums/project-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProjectCreatedEvent } from '@/events/implements/projects/project-created.event';
import { ProjectRemovedEvent } from '@/events/implements/projects/project-removed.event';
import { ProjectUpdatedEvent } from '@/events/implements/projects/project-updated.event';

export interface IProjectModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly slug: string;
  readonly name: string;
  readonly description?: string;
  readonly status: ProjectStatus;
  readonly avatar?: string;
  readonly plan?: string;
  readonly currency: string;
  readonly active: boolean;
  readonly blockedAt?: Date | string;
  readonly activatedAt?: Date | string;
  readonly deactivatedAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
}

export class ProjectModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly slug: string;
  readonly name: string;
  readonly description?: string;
  readonly status: ProjectStatus;
  readonly avatar?: string;
  readonly plan?: string;
  readonly currency: string;
  readonly active: boolean;
  readonly blockedAt?: string;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
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
    this.slug = data.slug;
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.avatar = data.avatar;
    this.plan = data.plan;
    this.currency = data.currency;
    this.active = data.active;
    this.blockedAt = convertToISODateString(data.blockedAt);
    this.activatedAt = convertToISODateString(data.activatedAt);
    this.deactivatedAt = convertToISODateString(data.deactivatedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
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
