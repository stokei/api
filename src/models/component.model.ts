import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ComponentType } from '@/enums/component-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ComponentCreatedEvent } from '@/events/implements/components/component-created.event';
import { ComponentRemovedEvent } from '@/events/implements/components/component-removed.event';
import { ComponentUpdatedEvent } from '@/events/implements/components/component-updated.event';

export interface IComponentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly type: ComponentType;
  readonly data?: any;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ComponentModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly type: ComponentType;
  readonly data?: any;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;

  constructor(data: IComponentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COMPONENTS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.type = data.type;
    this.data = data.data;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdComponent({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ComponentCreatedEvent({
          createdBy,
          component: this
        })
      );
    }
  }

  updatedComponent({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new ComponentUpdatedEvent({
          updatedBy,
          component: this
        })
      );
    }
  }

  removedComponent({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ComponentRemovedEvent({
          removedBy,
          component: this
        })
      );
    }
  }
}
