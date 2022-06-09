import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomsEnrollmentCreatedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-created.event';
import { ClassroomsEnrollmentRemovedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-removed.event';
import { ClassroomsEnrollmentUpdatedEvent } from '@/events/implements/classrooms-enrollments/classrooms-enrollment-updated.event';

export interface IClassroomsEnrollmentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ClassroomsEnrollmentModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IClassroomsEnrollmentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS_ENROLLMENTS,
      module: ServerStokeiApiIdPrefix.CLASSROOMS_ENROLLMENTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
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
