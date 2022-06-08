import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CoursesInstructorCreatedEvent } from '@/events/implements/courses-instructors/courses-instructor-created.event';
import { CoursesInstructorUpdatedEvent } from '@/events/implements/courses-instructors/courses-instructor-updated.event';
import { CoursesInstructorRemovedEvent } from '@/events/implements/courses-instructors/courses-instructor-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface ICoursesInstructorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class CoursesInstructorModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ICoursesInstructorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COURSES_INSTRUCTORS,
      module: ServerStokeiApiIdPrefix.COURSES_INSTRUCTORS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdCoursesInstructor() {
    if (this.id) {
      this.apply(
        new CoursesInstructorCreatedEvent({
          coursesInstructor: this
        })
      );
    }
  }

  updatedCoursesInstructor() {
    if (this.id) {
      this.apply(
        new CoursesInstructorUpdatedEvent({
          coursesInstructor: this
        })
      );
    }
  }

  removedCoursesInstructor() {
    if (this.id) {
      this.apply(
        new CoursesInstructorRemovedEvent({
          coursesInstructor: this
        })
      );
    }
  }
}
