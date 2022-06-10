import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISOTimestamp, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AccessCreatedEvent } from '@/events/implements/accesses/access-created.event';
import { AccessRemovedEvent } from '@/events/implements/accesses/access-removed.event';
import { AccessUpdatedEvent } from '@/events/implements/accesses/access-updated.event';

import { AccountModel } from './account.model';

export interface IAccessModelData {
  accessToken?: string;
  refreshToken?: string;
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly active?: boolean;
  readonly expiresIn: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class AccessModel extends AggregateRoot {
  accessToken?: string;
  refreshToken?: string;
  readonly id: string;
  readonly parent: string;
  readonly active?: boolean;
  readonly expiresIn: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;

  constructor(data: IAccessModelData) {
    super();

    const now = Date.now();
    const expiresIn = convertToISOTimestamp(data.expiresIn);
    const isActive = data.active ? now < expiresIn : data.active;

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ACCOUNTS,
      module: ServerStokeiApiIdPrefix.ACCESSES,
      id: data._id?.toString() || data.id
    });
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.parent = data.parent;
    this.active = isActive;
    this.expiresIn = data.expiresIn;
    this.canceledAt = data.canceledAt;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdAccess(account: AccountModel) {
    if (this.id) {
      this.apply(
        new AccessCreatedEvent({
          access: this,
          account
        })
      );
    }
  }

  updatedAccess() {
    if (this.id) {
      this.apply(
        new AccessUpdatedEvent({
          access: this
        })
      );
    }
  }

  removedAccess() {
    if (this.id) {
      this.apply(
        new AccessRemovedEvent({
          access: this
        })
      );
    }
  }
}
