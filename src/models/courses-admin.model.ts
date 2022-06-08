import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CoursesAdminCreatedEvent } from '@/events/implements/courses-admins/courses-admin-created.event';
import { CoursesAdminUpdatedEvent } from '@/events/implements/courses-admins/courses-admin-updated.event';
import { CoursesAdminRemovedEvent } from '@/events/implements/courses-admins/courses-admin-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface ICoursesAdminModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class CoursesAdminModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ICoursesAdminModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COURSES_ADMINS,
      module: ServerStokeiApiIdPrefix.COURSES_ADMINS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdCoursesAdmin() {
    if (this.id) {
      this.apply(
        new CoursesAdminCreatedEvent({
          coursesAdmin: this
        })
      );
    }
  }

  updatedCoursesAdmin() {
    if (this.id) {
      this.apply(
        new CoursesAdminUpdatedEvent({
          coursesAdmin: this
        })
      );
    }
  }

  removedCoursesAdmin() {
    if (this.id) {
      this.apply(
        new CoursesAdminRemovedEvent({
          coursesAdmin: this
        })
      );
    }
  }
}
