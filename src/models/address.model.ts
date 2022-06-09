import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AddressCreatedEvent } from '@/events/implements/addresses/address-created.event';
import { AddressRemovedEvent } from '@/events/implements/addresses/address-removed.event';
import { AddressUpdatedEvent } from '@/events/implements/addresses/address-updated.event';

export interface IAddressModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class AddressModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IAddressModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ADDRESSES,
      module: ServerStokeiApiIdPrefix.ADDRESSES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdAddress() {
    if (this.id) {
      this.apply(
        new AddressCreatedEvent({
          address: this
        })
      );
    }
  }

  updatedAddress() {
    if (this.id) {
      this.apply(
        new AddressUpdatedEvent({
          address: this
        })
      );
    }
  }

  removedAddress() {
    if (this.id) {
      this.apply(
        new AddressRemovedEvent({
          address: this
        })
      );
    }
  }
}
