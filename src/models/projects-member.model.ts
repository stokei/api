import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ProjectMemberRole } from '@/enums/project-member-role.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProjectsMemberCreatedEvent } from '@/events/implements/projects-members/projects-member-created.event';
import { ProjectsMemberRemovedEvent } from '@/events/implements/projects-members/projects-member-removed.event';
import { ProjectsMemberUpdatedEvent } from '@/events/implements/projects-members/projects-member-updated.event';

export interface IProjectsMemberModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly project: string;
  readonly member: string;
  readonly roles: ProjectMemberRole[];
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
}

export class ProjectsMemberModel extends AggregateRoot {
  readonly id: string;
  readonly project: string;
  readonly member: string;
  readonly roles: ProjectMemberRole[];
  readonly updatedAt: string;
  readonly createdAt: string;

  constructor(data: IProjectsMemberModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PROJECTS_MEMBERS,
      module: ServerStokeiApiIdPrefix.PROJECTS_MEMBERS,
      id: data._id?.toString() || data.id
    });
    this.project = data.project;
    this.member = data.member;
    this.roles = data.roles;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
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
