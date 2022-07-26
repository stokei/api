import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CourseInstructorCreatedEvent } from '@/events/implements/course-instructors/course-instructor-created.event';
import { CourseInstructorRemovedEvent } from '@/events/implements/course-instructors/course-instructor-removed.event';

export interface ICourseInstructorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly course: string;
  readonly instructor: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class CourseInstructorModel extends AggregateRoot {
  readonly id: string;
  readonly course: string;
  readonly instructor: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ICourseInstructorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COURSE_INSTRUCTORS,
      module: ServerStokeiApiIdPrefix.COURSE_INSTRUCTORS,
      id: data._id?.toString() || data.id
    });
    this.course = data.course;
    this.instructor = data.instructor;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdCourseInstructor({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new CourseInstructorCreatedEvent({
          createdBy,
          courseInstructor: this
        })
      );
    }
  }

  removedCourseInstructor({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new CourseInstructorRemovedEvent({
          removedBy,
          courseInstructor: this
        })
      );
    }
  }
}
