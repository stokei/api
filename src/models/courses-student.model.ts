import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CoursesStudentCreatedEvent } from '@/events/implements/courses-students/courses-student-created.event';
import { CoursesStudentRemovedEvent } from '@/events/implements/courses-students/courses-student-removed.event';
import { CoursesStudentUpdatedEvent } from '@/events/implements/courses-students/courses-student-updated.event';

export interface ICoursesStudentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly course: string;
  readonly student: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
}

export class CoursesStudentModel extends AggregateRoot {
  readonly id: string;
  readonly course: string;
  readonly student: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ICoursesStudentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COURSES_STUDENTS,
      module: ServerStokeiApiIdPrefix.COURSES_STUDENTS,
      id: data._id?.toString() || data.id
    });
    this.course = data.course;
    this.student = data.student;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
  }

  createdCoursesStudent() {
    if (this.id) {
      this.apply(
        new CoursesStudentCreatedEvent({
          coursesStudent: this
        })
      );
    }
  }

  updatedCoursesStudent() {
    if (this.id) {
      this.apply(
        new CoursesStudentUpdatedEvent({
          coursesStudent: this
        })
      );
    }
  }

  removedCoursesStudent() {
    if (this.id) {
      this.apply(
        new CoursesStudentRemovedEvent({
          coursesStudent: this
        })
      );
    }
  }
}
