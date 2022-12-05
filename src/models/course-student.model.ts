import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CourseStudentCreatedEvent } from '@/events/implements/course-students/course-student-created.event';
import { CourseStudentRemovedEvent } from '@/events/implements/course-students/course-student-removed.event';

export interface ICourseStudentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly course: string;
  readonly student: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class CourseStudentModel extends AggregateRoot {
  readonly id: string;
  readonly course: string;
  readonly student: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ICourseStudentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COURSE_STUDENTS,
      id: data._id?.toString() || data.id
    });
    this.course = data.course;
    this.student = data.student;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdCourseStudent({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new CourseStudentCreatedEvent({
          createdBy,
          courseStudent: this
        })
      );
    }
  }

  removedCourseStudent({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new CourseStudentRemovedEvent({
          removedBy,
          courseStudent: this
        })
      );
    }
  }
}
