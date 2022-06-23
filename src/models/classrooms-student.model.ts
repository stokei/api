import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomsStudentCreatedEvent } from '@/events/implements/classrooms-students/classrooms-student-created.event';
import { ClassroomsStudentRemovedEvent } from '@/events/implements/classrooms-students/classrooms-student-removed.event';
import { ClassroomsStudentUpdatedEvent } from '@/events/implements/classrooms-students/classrooms-student-updated.event';

export interface IClassroomsStudentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ClassroomsStudentModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IClassroomsStudentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS_STUDENTS,
      module: ServerStokeiApiIdPrefix.CLASSROOMS_STUDENTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
  }

  createdClassroomsStudent() {
    if (this.id) {
      this.apply(
        new ClassroomsStudentCreatedEvent({
          classroomsStudent: this
        })
      );
    }
  }

  updatedClassroomsStudent() {
    if (this.id) {
      this.apply(
        new ClassroomsStudentUpdatedEvent({
          classroomsStudent: this
        })
      );
    }
  }

  removedClassroomsStudent() {
    if (this.id) {
      this.apply(
        new ClassroomsStudentRemovedEvent({
          classroomsStudent: this
        })
      );
    }
  }
}
