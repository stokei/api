import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomsMaterialCreatedEvent } from '@/events/implements/classrooms-materials/classrooms-material-created.event';
import { ClassroomsMaterialRemovedEvent } from '@/events/implements/classrooms-materials/classrooms-material-removed.event';
import { ClassroomsMaterialUpdatedEvent } from '@/events/implements/classrooms-materials/classrooms-material-updated.event';

export interface IClassroomsMaterialModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ClassroomsMaterialModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IClassroomsMaterialModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS_MATERIALS,
      module: ServerStokeiApiIdPrefix.CLASSROOMS_MATERIALS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdClassroomsMaterial() {
    if (this.id) {
      this.apply(
        new ClassroomsMaterialCreatedEvent({
          classroomsMaterial: this
        })
      );
    }
  }

  updatedClassroomsMaterial() {
    if (this.id) {
      this.apply(
        new ClassroomsMaterialUpdatedEvent({
          classroomsMaterial: this
        })
      );
    }
  }

  removedClassroomsMaterial() {
    if (this.id) {
      this.apply(
        new ClassroomsMaterialRemovedEvent({
          classroomsMaterial: this
        })
      );
    }
  }
}
