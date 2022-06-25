import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CartsItemModel, ICartsItemModelData } from '@/models/carts-item.model';

export class CartsItemModelMock extends CartsItemModel {
  constructor(data?: Partial<ICartsItemModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      price: data?.price ?? 'prices.1sa21d5ad51as5d1as5',
      quantity: data?.quantity ?? 1,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
