import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CartsItemModel, ICartsItemModelData } from '@/models/carts-item.model';

export class CartsItemModelMock extends CartsItemModel {
  constructor(data?: Partial<ICartsItemModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'CartsItem Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
