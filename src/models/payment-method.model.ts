import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PaymentMethodCreatedEvent } from '@/events/implements/payment-methods/payment-method-created.event';
import { PaymentMethodRemovedEvent } from '@/events/implements/payment-methods/payment-method-removed.event';

export interface IPaymentMethodModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly stripePaymentMethod: string;
  readonly lastFourCardNumber?: string;
  readonly cardBrand?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PaymentMethodModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly stripePaymentMethod: string;
  readonly lastFourCardNumber?: string;
  readonly cardBrand?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IPaymentMethodModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PAYMENT_METHODS,
      id: data._id?.toString() || data.id
    });
    this.stripePaymentMethod = data.stripePaymentMethod;
    this.lastFourCardNumber = data.lastFourCardNumber;
    this.cardBrand = data.cardBrand;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdPaymentMethod({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new PaymentMethodCreatedEvent({
          createdBy,
          paymentMethod: this
        })
      );
    }
  }

  removedPaymentMethod({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new PaymentMethodRemovedEvent({
          removedBy,
          paymentMethod: this
        })
      );
    }
  }
}
