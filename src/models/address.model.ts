import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AddressCreatedEvent } from '@/events/implements/addresses/address-created.event';
import { AddressRemovedEvent } from '@/events/implements/addresses/address-removed.event';
import { AddressUpdatedEvent } from '@/events/implements/addresses/address-updated.event';

export interface IAddressModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly default: boolean;
  readonly street: string;
  readonly complement?: string;
  readonly number: string;
  readonly city: string;
  readonly country: string;
  readonly state: string;
  readonly postalCode: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class AddressModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly default: boolean;
  readonly street: string;
  readonly complement?: string;
  readonly number: string;
  readonly city: string;
  readonly country: string;
  readonly state: string;
  readonly postalCode: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IAddressModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ADDRESSES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.default = data.default;
    this.street = data.street;
    this.complement = data.complement;
    this.number = data.number;
    this.city = data.city;
    this.country = data.country;
    this.state = data.state;
    this.postalCode = data.postalCode;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdAddress({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new AddressCreatedEvent({
          createdBy,
          address: this
        })
      );
    }
  }

  updatedAddress({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new AddressUpdatedEvent({
          updatedBy,
          address: this
        })
      );
    }
  }

  removedAddress({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new AddressRemovedEvent({
          removedBy,
          address: this
        })
      );
    }
  }
}
