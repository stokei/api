import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProjectsMemberCreatedEvent } from '@/events/implements/projects-members/projects-member-created.event';
import { ProjectsMemberRemovedEvent } from '@/events/implements/projects-members/projects-member-removed.event';
import { ProjectsMemberUpdatedEvent } from '@/events/implements/projects-members/projects-member-updated.event';

export interface IProjectsMemberModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ProjectsMemberModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IProjectsMemberModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PROJECTS_MEMBERS,
      module: ServerStokeiApiIdPrefix.PROJECTS_MEMBERS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdProjectsMember() {
    if (this.id) {
      this.apply(
        new ProjectsMemberCreatedEvent({
          projectsMember: this
        })
      );
    }
  }

  updatedProjectsMember() {
    if (this.id) {
      this.apply(
        new ProjectsMemberUpdatedEvent({
          projectsMember: this
        })
      );
    }
  }

  removedProjectsMember() {
    if (this.id) {
      this.apply(
        new ProjectsMemberRemovedEvent({
          projectsMember: this
        })
      );
    }
  }
}
