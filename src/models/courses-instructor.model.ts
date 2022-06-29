import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CoursesInstructorCreatedEvent } from '@/events/implements/courses-instructors/courses-instructor-created.event';
import { CoursesInstructorRemovedEvent } from '@/events/implements/courses-instructors/courses-instructor-removed.event';
import { CoursesInstructorUpdatedEvent } from '@/events/implements/courses-instructors/courses-instructor-updated.event';

export interface ICoursesInstructorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly course: string;
  readonly instructor: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class CoursesInstructorModel extends AggregateRoot {
  readonly id: string;
  readonly course: string;
  readonly instructor: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ICoursesInstructorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COURSES_INSTRUCTORS,
      module: ServerStokeiApiIdPrefix.COURSES_INSTRUCTORS,
      id: data._id?.toString() || data.id
    });
    this.course = data.course;
    this.instructor = data.instructor;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
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
