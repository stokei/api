import {
  IPixCheckoutModelData,
  PixCheckoutModel
} from '@/models/pix-checkout.model';

export class PixCheckoutMapper {
  toModel(pixCheckout: IPixCheckoutModelData) {
    return pixCheckout && new PixCheckoutModel(pixCheckout);
  }
  toModels(pixCheckouts: IPixCheckoutModelData[]) {
    return pixCheckouts?.length > 0
      ? pixCheckouts.map(this.toModel).filter(Boolean)
      : [];
  }
}
