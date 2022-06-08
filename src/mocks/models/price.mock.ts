import { PriceModel, IPriceModelData } from '@/models/price.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class PriceModelMock extends PriceModel {
  constructor(data?: Partial<IPriceModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Price Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
