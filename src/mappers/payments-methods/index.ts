import { convertToISODateString } from '@stokei/nestjs';

import { PaymentsMethodEntity } from '@/entities';
import { PaymentsMethodModel } from '@/models/payments-method.model';

export class PaymentsMethodMapper {
  toModel(paymentsMethod: PaymentsMethodEntity) {
    return (
      paymentsMethod &&
      new PaymentsMethodModel({
        ...paymentsMethod,
        updatedAt: convertToISODateString(paymentsMethod.updatedAt),
        createdAt: convertToISODateString(paymentsMethod.createdAt)
      })
    );
  }
  toModels(paymentsMethods: PaymentsMethodEntity[]) {
    return paymentsMethods?.length > 0
      ? paymentsMethods.map(this.toModel).filter(Boolean)
      : [];
  }
}
