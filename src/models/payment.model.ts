import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PaymentCreatedEvent } from '@/events/implements/payments/payment-created.event';
import { PaymentRemovedEvent } from '@/events/implements/payments/payment-removed.event';
import { PaymentUpdatedEvent } from '@/events/implements/payments/payment-updated.event';

export interface IPaymentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PaymentModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IPaymentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.MODULES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdPayment({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new PaymentCreatedEvent({
          createdBy,
          payment: this
        })
      );
    }
  }

  updatedPayment({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new PaymentUpdatedEvent({
          updatedBy,
          payment: this
        })
      );
    }
  }

  removedPayment({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new PaymentRemovedEvent({
          removedBy,
          payment: this
        })
      );
    }
  }
}
