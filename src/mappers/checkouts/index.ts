import { CheckoutModel, ICheckoutModelData } from '@/models/checkout.model';

export class CheckoutMapper {
  toModel(checkout: ICheckoutModelData) {
    return checkout && new CheckoutModel(checkout);
  }
  toModels(checkouts: ICheckoutModelData[]) {
    return checkouts?.length > 0
      ? checkouts.map(this.toModel).filter(Boolean)
      : [];
  }
}
