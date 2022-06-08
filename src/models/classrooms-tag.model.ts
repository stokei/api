import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ClassroomsTagCreatedEvent } from '@/events/implements/classrooms-tags/classrooms-tag-created.event';
import { ClassroomsTagUpdatedEvent } from '@/events/implements/classrooms-tags/classrooms-tag-updated.event';
import { ClassroomsTagRemovedEvent } from '@/events/implements/classrooms-tags/classrooms-tag-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IClassroomsTagModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ClassroomsTagModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IClassroomsTagModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CLASSROOMS_TAGS,
      module: ServerStokeiApiIdPrefix.CLASSROOMS_TAGS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdClassroomsTag() {
    if (this.id) {
      this.apply(
        new ClassroomsTagCreatedEvent({
          classroomsTag: this
        })
      );
    }
  }

  updatedClassroomsTag() {
    if (this.id) {
      this.apply(
        new ClassroomsTagUpdatedEvent({
          classroomsTag: this
        })
      );
    }
  }

  removedClassroomsTag() {
    if (this.id) {
      this.apply(
        new ClassroomsTagRemovedEvent({
          classroomsTag: this
        })
      );
    }
  }
}
