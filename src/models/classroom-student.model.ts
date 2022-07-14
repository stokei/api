import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomStudentCreatedEvent } from '@/events/implements/classroom-students/classroom-student-created.event';
import { ClassroomStudentRemovedEvent } from '@/events/implements/classroom-students/classroom-student-removed.event';

export interface IClassroomStudentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly classroom: string;
  readonly student: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ClassroomStudentModel extends AggregateRoot {
  readonly id: string;
  readonly classroom: string;
  readonly student: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IClassroomStudentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOM_STUDENTS,
      module: ServerStokeiApiIdPrefix.CLASSROOM_STUDENTS,
      id: data._id?.toString() || data.id
    });
    this.classroom = data.classroom;
    this.student = data.student;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdClassroomStudent({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomStudentCreatedEvent({
          createdBy,
          classroomStudent: this
        })
      );
    }
  }

  removedClassroomStudent({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomStudentRemovedEvent({
          removedBy,
          classroomStudent: this
        })
      );
    }
  }
}
