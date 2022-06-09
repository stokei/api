import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomsAdminCreatedEvent } from '@/events/implements/classrooms-admins/classrooms-admin-created.event';
import { ClassroomsAdminRemovedEvent } from '@/events/implements/classrooms-admins/classrooms-admin-removed.event';
import { ClassroomsAdminUpdatedEvent } from '@/events/implements/classrooms-admins/classrooms-admin-updated.event';

export interface IClassroomsAdminModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ClassroomsAdminModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IClassroomsAdminModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS_ADMINS,
      module: ServerStokeiApiIdPrefix.CLASSROOMS_ADMINS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdClassroomsAdmin() {
    if (this.id) {
      this.apply(
        new ClassroomsAdminCreatedEvent({
          classroomsAdmin: this
        })
      );
    }
  }

  updatedClassroomsAdmin() {
    if (this.id) {
      this.apply(
        new ClassroomsAdminUpdatedEvent({
          classroomsAdmin: this
        })
      );
    }
  }

  removedClassroomsAdmin() {
    if (this.id) {
      this.apply(
        new ClassroomsAdminRemovedEvent({
          classroomsAdmin: this
        })
      );
    }
  }
}
