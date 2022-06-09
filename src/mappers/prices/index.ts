import { convertToISODateString } from '@stokei/nestjs';

import { PriceEntity } from '@/entities';
import { PriceModel } from '@/models/price.model';

export class PriceMapper {
  toModel(price: PriceEntity) {
    return (
      price &&
      new PriceModel({
        ...price,
        updatedAt: convertToISODateString(price.updatedAt),
        createdAt: convertToISODateString(price.createdAt)
      })
    );
  }
  toModels(prices: PriceEntity[]) {
    return prices?.length > 0 ? prices.map(this.toModel).filter(Boolean) : [];
  }
}
