import { CartModel, ICartModelData } from '@/models/cart.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class CartModelMock extends CartModel {
  constructor(data?: Partial<ICartModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Cart Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
