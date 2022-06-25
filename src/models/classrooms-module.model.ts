import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomsModuleCreatedEvent } from '@/events/implements/classrooms-modules/classrooms-module-created.event';
import { ClassroomsModuleRemovedEvent } from '@/events/implements/classrooms-modules/classrooms-module-removed.event';
import { ClassroomsModuleUpdatedEvent } from '@/events/implements/classrooms-modules/classrooms-module-updated.event';

export interface IClassroomsModuleModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly classroom: string;
  readonly module: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
}

export class ClassroomsModuleModel extends AggregateRoot {
  readonly id: string;
  readonly classroom: string;
  readonly module: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IClassroomsModuleModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS_MODULES,
      module: ServerStokeiApiIdPrefix.CLASSROOMS_MODULES,
      id: data._id?.toString() || data.id
    });
    this.classroom = data.classroom;
    this.module = data.module;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
  }

  createdClassroomsModule() {
    if (this.id) {
      this.apply(
        new ClassroomsModuleCreatedEvent({
          classroomsModule: this
        })
      );
    }
  }

  updatedClassroomsModule() {
    if (this.id) {
      this.apply(
        new ClassroomsModuleUpdatedEvent({
          classroomsModule: this
        })
      );
    }
  }

  removedClassroomsModule() {
    if (this.id) {
      this.apply(
        new ClassroomsModuleRemovedEvent({
          classroomsModule: this
        })
      );
    }
  }
}
