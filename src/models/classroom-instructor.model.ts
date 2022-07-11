import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomInstructorCreatedEvent } from '@/events/implements/classroom-instructors/classroom-instructor-created.event';
import { ClassroomInstructorRemovedEvent } from '@/events/implements/classroom-instructors/classroom-instructor-removed.event';
import { ClassroomInstructorUpdatedEvent } from '@/events/implements/classroom-instructors/classroom-instructor-updated.event';

export interface IClassroomInstructorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly classroom: string;
  readonly instructor: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ClassroomInstructorModel extends AggregateRoot {
  readonly id: string;
  readonly classroom: string;
  readonly instructor: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IClassroomInstructorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOM_INSTRUCTORS,
      module: ServerStokeiApiIdPrefix.CLASSROOM_INSTRUCTORS,
      id: data._id?.toString() || data.id
    });
    this.classroom = data.classroom;
    this.instructor = data.instructor;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdClassroomInstructor({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomInstructorCreatedEvent({
          createdBy,
          classroomInstructor: this
        })
      );
    }
  }

  updatedClassroomInstructor({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomInstructorUpdatedEvent({
          updatedBy,
          classroomInstructor: this
        })
      );
    }
  }

  removedClassroomInstructor({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomInstructorRemovedEvent({
          removedBy,
          classroomInstructor: this
        })
      );
    }
  }
}
