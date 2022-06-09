import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomsInstructorCreatedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-created.event';
import { ClassroomsInstructorRemovedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-removed.event';
import { ClassroomsInstructorUpdatedEvent } from '@/events/implements/classrooms-instructors/classrooms-instructor-updated.event';

export interface IClassroomsInstructorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ClassroomsInstructorModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IClassroomsInstructorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS_INSTRUCTORS,
      module: ServerStokeiApiIdPrefix.CLASSROOMS_INSTRUCTORS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdClassroomsInstructor() {
    if (this.id) {
      this.apply(
        new ClassroomsInstructorCreatedEvent({
          classroomsInstructor: this
        })
      );
    }
  }

  updatedClassroomsInstructor() {
    if (this.id) {
      this.apply(
        new ClassroomsInstructorUpdatedEvent({
          classroomsInstructor: this
        })
      );
    }
  }

  removedClassroomsInstructor() {
    if (this.id) {
      this.apply(
        new ClassroomsInstructorRemovedEvent({
          classroomsInstructor: this
        })
      );
    }
  }
}
