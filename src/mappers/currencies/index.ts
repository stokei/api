import { convertToISODateString } from '@stokei/nestjs';
import { CurrencyEntity } from '@/entities';
import { CurrencyModel } from '@/models/currency.model';

export class CurrencyMapper {
  toModel(currency: CurrencyEntity) {
    return (
      currency &&
      new CurrencyModel({
        ...currency,
        updatedAt: convertToISODateString(currency.updatedAt),
        createdAt: convertToISODateString(currency.createdAt)
      })
    );
  }
  toModels(currencies: CurrencyEntity[]) {
    return currencies?.length > 0
      ? currencies.map(this.toModel).filter(Boolean)
      : [];
  }
}
