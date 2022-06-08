import { convertToISODateString } from '@stokei/nestjs';
import { PaymentEntity } from '@/entities';
import { PaymentModel } from '@/models/payment.model';

export class PaymentMapper {
  toModel(payment: PaymentEntity) {
    return (
      payment &&
      new PaymentModel({
        ...payment,
        updatedAt: convertToISODateString(payment.updatedAt),
        createdAt: convertToISODateString(payment.createdAt)
      })
    );
  }
  toModels(payments: PaymentEntity[]) {
    return payments?.length > 0
      ? payments.map(this.toModel).filter(Boolean)
      : [];
  }
}
