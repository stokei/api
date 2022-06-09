import { convertToISODateString } from '@stokei/nestjs';

import { CheckoutEntity } from '@/entities';
import { CheckoutModel } from '@/models/checkout.model';

export class CheckoutMapper {
  toModel(checkout: CheckoutEntity) {
    return (
      checkout &&
      new CheckoutModel({
        ...checkout,
        updatedAt: convertToISODateString(checkout.updatedAt),
        createdAt: convertToISODateString(checkout.createdAt)
      })
    );
  }
  toModels(checkouts: CheckoutEntity[]) {
    return checkouts?.length > 0
      ? checkouts.map(this.toModel).filter(Boolean)
      : [];
  }
}
