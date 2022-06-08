import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomsPlanCreatedEvent } from '@/events/implements/classrooms-plans/classrooms-plan-created.event';
import { ClassroomsPlanUpdatedEvent } from '@/events/implements/classrooms-plans/classrooms-plan-updated.event';
import { ClassroomsPlanRemovedEvent } from '@/events/implements/classrooms-plans/classrooms-plan-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IClassroomsPlanModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ClassroomsPlanModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IClassroomsPlanModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS_PLANS,
      module: ServerStokeiApiIdPrefix.CLASSROOMS_PLANS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdClassroomsPlan() {
    if (this.id) {
      this.apply(
        new ClassroomsPlanCreatedEvent({
          classroomsPlan: this
        })
      );
    }
  }

  updatedClassroomsPlan() {
    if (this.id) {
      this.apply(
        new ClassroomsPlanUpdatedEvent({
          classroomsPlan: this
        })
      );
    }
  }

  removedClassroomsPlan() {
    if (this.id) {
      this.apply(
        new ClassroomsPlanRemovedEvent({
          classroomsPlan: this
        })
      );
    }
  }
}
