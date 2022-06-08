import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PhoneCreatedEvent } from '@/events/implements/phones/phone-created.event';
import { PhoneUpdatedEvent } from '@/events/implements/phones/phone-updated.event';
import { PhoneRemovedEvent } from '@/events/implements/phones/phone-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IPhoneModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class PhoneModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IPhoneModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PHONES,
      module: ServerStokeiApiIdPrefix.PHONES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdPhone() {
    if (this.id) {
      this.apply(
        new PhoneCreatedEvent({
          phone: this
        })
      );
    }
  }

  updatedPhone() {
    if (this.id) {
      this.apply(
        new PhoneUpdatedEvent({
          phone: this
        })
      );
    }
  }

  removedPhone() {
    if (this.id) {
      this.apply(
        new PhoneRemovedEvent({
          phone: this
        })
      );
    }
  }
}
