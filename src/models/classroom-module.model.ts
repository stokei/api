import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomModuleCreatedEvent } from '@/events/implements/classroom-modules/classroom-module-created.event';
import { ClassroomModuleRemovedEvent } from '@/events/implements/classroom-modules/classroom-module-removed.event';

export interface IClassroomModuleModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly classroom: string;
  readonly module: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ClassroomModuleModel extends AggregateRoot {
  readonly id: string;
  readonly classroom: string;
  readonly module: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IClassroomModuleModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOM_MODULES,
      module: ServerStokeiApiIdPrefix.CLASSROOM_MODULES,
      id: data._id?.toString() || data.id
    });
    this.classroom = data.classroom;
    this.module = data.module;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdClassroomModule({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomModuleCreatedEvent({
          createdBy,
          classroomModule: this
        })
      );
    }
  }

  removedClassroomModule({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomModuleRemovedEvent({
          removedBy,
          classroomModule: this
        })
      );
    }
  }
}
