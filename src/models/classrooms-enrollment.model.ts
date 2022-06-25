import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ClassroomsEnrollmentStatus } from '@/enums/classrooms-enrollment-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomsEnrollmentCreatedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-created.event';
import { ClassroomsEnrollmentRemovedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-removed.event';
import { ClassroomsEnrollmentUpdatedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-updated.event';

export interface IClassroomsEnrollmentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly classroom: string;
  readonly student: string;
  readonly status: ClassroomsEnrollmentStatus;
  readonly active: boolean;
  readonly startAt?: Date | string;
  readonly endAt?: Date | string;
  readonly canceledAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
}

export class ClassroomsEnrollmentModel extends AggregateRoot {
  readonly id: string;
  readonly classroom: string;
  readonly student: string;
  readonly status: ClassroomsEnrollmentStatus;
  readonly active: boolean;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IClassroomsEnrollmentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS_ENROLLMENTS,
      module: ServerStokeiApiIdPrefix.CLASSROOMS_ENROLLMENTS,
      id: data._id?.toString() || data.id
    });
    this.classroom = data.classroom;
    this.student = data.student;
    this.status = data.status;
    this.active = data.active;
    this.startAt = convertToISODateString(data.startAt);
    this.endAt = convertToISODateString(data.endAt);
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
  }

  createdClassroomsEnrollment() {
    if (this.id) {
      this.apply(
        new ClassroomsEnrollmentCreatedEvent({
          classroomsEnrollment: this
        })
      );
    }
  }

  updatedClassroomsEnrollment() {
    if (this.id) {
      this.apply(
        new ClassroomsEnrollmentUpdatedEvent({
          classroomsEnrollment: this
        })
      );
    }
  }

  removedClassroomsEnrollment() {
    if (this.id) {
      this.apply(
        new ClassroomsEnrollmentRemovedEvent({
          classroomsEnrollment: this
        })
      );
    }
  }
}
