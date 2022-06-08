import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PaymentsMethodCreatedEvent } from '@/events/implements/payments-methods/payments-method-created.event';
import { PaymentsMethodUpdatedEvent } from '@/events/implements/payments-methods/payments-method-updated.event';
import { PaymentsMethodRemovedEvent } from '@/events/implements/payments-methods/payments-method-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IPaymentsMethodModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class PaymentsMethodModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IPaymentsMethodModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PAYMENTS_METHODS,
      module: ServerStokeiApiIdPrefix.PAYMENTS_METHODS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdPaymentsMethod() {
    if (this.id) {
      this.apply(
        new PaymentsMethodCreatedEvent({
          paymentsMethod: this
        })
      );
    }
  }

  updatedPaymentsMethod() {
    if (this.id) {
      this.apply(
        new PaymentsMethodUpdatedEvent({
          paymentsMethod: this
        })
      );
    }
  }

  removedPaymentsMethod() {
    if (this.id) {
      this.apply(
        new PaymentsMethodRemovedEvent({
          paymentsMethod: this
        })
      );
    }
  }
}
