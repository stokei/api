import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CurrencyModel, ICurrencyModelData } from '@/models/currency.model';

export class CurrencyModelMock extends CurrencyModel {
  constructor(data?: Partial<ICurrencyModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Currency Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
