import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AppAdminCreatedEvent } from '@/events/implements/app-admins/app-admin-created.event';
import { AppAdminRemovedEvent } from '@/events/implements/app-admins/app-admin-removed.event';

export interface IAppAdminModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly admin: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class AppAdminModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly admin: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IAppAdminModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.APP_ADMINS,
      module: ServerStokeiApiIdPrefix.APP_ADMINS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.admin = data.admin;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdAppAdmin({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new AppAdminCreatedEvent({
          createdBy,
          appAdmin: this
        })
      );
    }
  }

  removedAppAdmin({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new AppAdminRemovedEvent({
          removedBy,
          appAdmin: this
        })
      );
    }
  }
}
