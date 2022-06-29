import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomCreatedEvent } from '@/events/implements/classrooms/classroom-created.event';
import { ClassroomRemovedEvent } from '@/events/implements/classrooms/classroom-removed.event';
import { ClassroomUpdatedEvent } from '@/events/implements/classrooms/classroom-updated.event';

export interface IClassroomModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly hasAccessToAllModules: boolean;
  readonly active: boolean;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ClassroomModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly hasAccessToAllModules: boolean;
  readonly active: boolean;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IClassroomModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS,
      module: ServerStokeiApiIdPrefix.CLASSROOMS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
    this.hasAccessToAllModules = data.hasAccessToAllModules;
    this.active = data.active;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdClassroom({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomCreatedEvent({
          createdBy,
          classroom: this
        })
      );
    }
  }

  updatedClassroom({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomUpdatedEvent({
          updatedBy,
          classroom: this
        })
      );
    }
  }

  removedClassroom({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ClassroomRemovedEvent({
          removedBy,
          classroom: this
        })
      );
    }
  }
}
