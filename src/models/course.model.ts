import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CourseCreatedEvent } from '@/events/implements/courses/course-created.event';
import { CourseRemovedEvent } from '@/events/implements/courses/course-removed.event';
import { CourseUpdatedEvent } from '@/events/implements/courses/course-updated.event';

export interface ICourseModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly avatar?: string;
  readonly active: boolean;
  readonly canceledAt?: Date | string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class CourseModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly avatar?: string;
  readonly active: boolean;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ICourseModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COURSES,
      module: ServerStokeiApiIdPrefix.COURSES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
    this.avatar = data.avatar;
    this.active = data.active;
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdCourse({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new CourseCreatedEvent({
          createdBy,
          course: this
        })
      );
    }
  }

  updatedCourse({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new CourseUpdatedEvent({
          updatedBy,
          course: this
        })
      );
    }
  }

  removedCourse({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new CourseRemovedEvent({
          removedBy,
          course: this
        })
      );
    }
  }
}
