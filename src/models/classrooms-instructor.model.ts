import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomsInstructorCreatedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-created.event';
import { ClassroomsInstructorRemovedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-removed.event';
import { ClassroomsInstructorUpdatedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-updated.event';

export interface IClassroomsInstructorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly classroom: string;
  readonly instructor: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ClassroomsInstructorModel extends AggregateRoot {
  readonly id: string;
  readonly classroom: string;
  readonly instructor: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IClassroomsInstructorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS_INSTRUCTORS,
      module: ServerStokeiApiIdPrefix.CLASSROOMS_INSTRUCTORS,
      id: data._id?.toString() || data.id
    });
    this.classroom = data.classroom;
    this.instructor = data.instructor;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdClassroomsInstructor({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomsInstructorCreatedEvent({
          createdBy,
          classroomsInstructor: this
        })
      );
    }
  }

  updatedClassroomsInstructor({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomsInstructorUpdatedEvent({
          updatedBy,
          classroomsInstructor: this
        })
      );
    }
  }

  removedClassroomsInstructor({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomsInstructorRemovedEvent({
          removedBy,
          classroomsInstructor: this
        })
      );
    }
  }
}
