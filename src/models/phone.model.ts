import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { PhoneStatus } from '@/enums/phone-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PhoneCreatedEvent } from '@/events/implements/phones/phone-created.event';
import { PhoneRemovedEvent } from '@/events/implements/phones/phone-removed.event';

export interface IPhoneModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly fullnumber: string;
  readonly countryCode: string;
  readonly areaCode: string;
  readonly number: string;
  readonly validationCode: string;
  readonly status: PhoneStatus;
  readonly default: boolean;
  readonly active: boolean;
  readonly activatedAt?: Date | string;
  readonly validatedAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PhoneModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly fullnumber: string;
  readonly countryCode: string;
  readonly areaCode: string;
  readonly number: string;
  readonly validationCode: string;
  readonly status: PhoneStatus;
  readonly default: boolean;
  readonly active: boolean;
  readonly activatedAt?: string;
  readonly validatedAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IPhoneModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PHONES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.fullnumber = data.fullnumber;
    this.countryCode = data.countryCode;
    this.areaCode = data.areaCode;
    this.number = data.number;
    this.validationCode = data.validationCode;
    this.status = data.status;
    this.default = data.default;
    this.active = data.active;
    this.activatedAt = convertToISODateString(data.activatedAt);
    this.validatedAt = convertToISODateString(data.validatedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdPhone({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new PhoneCreatedEvent({
          createdBy,
          phone: this
        })
      );
    }
  }

  removedPhone({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new PhoneRemovedEvent({
          removedBy,
          phone: this
        })
      );
    }
  }
}
