import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { RoleCreatedEvent } from '@/events/implements/roles/role-created.event';
import { RoleRemovedEvent } from '@/events/implements/roles/role-removed.event';

export interface IRoleModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class RoleModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IRoleModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ROLES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.app = data.app;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdRole({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new RoleCreatedEvent({
          createdBy,
          role: this
        })
      );
    }
  }

  removedRole({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new RoleRemovedEvent({
          removedBy,
          role: this
        })
      );
    }
  }
}
