import { convertToISODateString } from '@stokei/nestjs';

import { PaymentMethodEntity } from '@/entities';
import { PaymentMethodModel } from '@/models/payment-method.model';

export class PaymentMethodMapper {
  toModel(paymentMethod: PaymentMethodEntity) {
    return (
      paymentMethod &&
      new PaymentMethodModel({
        ...paymentMethod,
        updatedAt: convertToISODateString(paymentMethod.updatedAt),
        createdAt: convertToISODateString(paymentMethod.createdAt)
      })
    );
  }
  toModels(paymentMethods: PaymentMethodEntity[]) {
    return paymentMethods?.length > 0
      ? paymentMethods.map(this.toModel).filter(Boolean)
      : [];
  }
}
