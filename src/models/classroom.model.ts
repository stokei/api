import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomCreatedEvent } from '@/events/implements/classrooms/classroom-created.event';
import { ClassroomUpdatedEvent } from '@/events/implements/classrooms/classroom-updated.event';
import { ClassroomRemovedEvent } from '@/events/implements/classrooms/classroom-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IClassroomModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ClassroomModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IClassroomModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS,
      module: ServerStokeiApiIdPrefix.CLASSROOMS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdClassroom() {
    if (this.id) {
      this.apply(
        new ClassroomCreatedEvent({
          classroom: this
        })
      );
    }
  }

  updatedClassroom() {
    if (this.id) {
      this.apply(
        new ClassroomUpdatedEvent({
          classroom: this
        })
      );
    }
  }

  removedClassroom() {
    if (this.id) {
      this.apply(
        new ClassroomRemovedEvent({
          classroom: this
        })
      );
    }
  }
}
