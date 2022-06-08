import { CartsItemModel, ICartsItemModelData } from '@/models/carts-item.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
