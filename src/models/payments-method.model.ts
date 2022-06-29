import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { PaymentsMethodProvider } from '@/enums/payments-method-provider.enum';
import { PaymentsMethodType } from '@/enums/payments-method-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PaymentsMethodCreatedEvent } from '@/events/implements/payments-methods/payments-method-created.event';
import { PaymentsMethodRemovedEvent } from '@/events/implements/payments-methods/payments-method-removed.event';
import { PaymentsMethodUpdatedEvent } from '@/events/implements/payments-methods/payments-method-updated.event';

export interface IPaymentsMethodModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly type: PaymentsMethodType;
  readonly provider: PaymentsMethodProvider;
  readonly externalPaymentMethodId: string;
  readonly active: boolean;
  readonly activatedAt?: Date | string;
  readonly deactivatedAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PaymentsMethodModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly type: PaymentsMethodType;
  readonly provider: PaymentsMethodProvider;
  readonly externalPaymentMethodId: string;
  readonly active: boolean;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IPaymentsMethodModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PAYMENTS_METHODS,
      module: ServerStokeiApiIdPrefix.PAYMENTS_METHODS,
      id: data._id?.toString() || data.id
    });
    this.type = data.type;
    this.provider = data.provider;
    this.externalPaymentMethodId = data.externalPaymentMethodId;
    this.active = data.active;
    this.activatedAt = convertToISODateString(data.activatedAt);
    this.deactivatedAt = convertToISODateString(data.deactivatedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
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
