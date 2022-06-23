import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CourseCreatedEvent } from '@/events/implements/courses/course-created.event';
import { CourseRemovedEvent } from '@/events/implements/courses/course-removed.event';
import { CourseUpdatedEvent } from '@/events/implements/courses/course-updated.event';

export interface ICourseModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class CourseModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ICourseModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COURSES,
      module: ServerStokeiApiIdPrefix.COURSES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
  }

  createdCourse() {
    if (this.id) {
      this.apply(
        new CourseCreatedEvent({
          course: this
        })
      );
    }
  }

  updatedCourse() {
    if (this.id) {
      this.apply(
        new CourseUpdatedEvent({
          course: this
        })
      );
    }
  }

  removedCourse() {
    if (this.id) {
      this.apply(
        new CourseRemovedEvent({
          course: this
        })
      );
    }
  }
}
