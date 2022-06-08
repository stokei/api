import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PaymentCreatedEvent } from '@/events/implements/payments/payment-created.event';
import { PaymentUpdatedEvent } from '@/events/implements/payments/payment-updated.event';
import { PaymentRemovedEvent } from '@/events/implements/payments/payment-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IPaymentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class PaymentModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IPaymentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PAYMENTS,
      module: ServerStokeiApiIdPrefix.PAYMENTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdPayment() {
    if (this.id) {
      this.apply(
        new PaymentCreatedEvent({
          payment: this
        })
      );
    }
  }

  updatedPayment() {
    if (this.id) {
      this.apply(
        new PaymentUpdatedEvent({
          payment: this
        })
      );
    }
  }

  removedPayment() {
    if (this.id) {
      this.apply(
        new PaymentRemovedEvent({
          payment: this
        })
      );
    }
  }
}
