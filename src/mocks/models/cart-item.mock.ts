import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CartItemModel, ICartItemModelData } from '@/models/cart-item.model';

export class CartItemModelMock extends CartItemModel {
  constructor(data?: Partial<ICartItemModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      product: data?.product ?? 'products.1sa21d5ad51as5d1as5',
      price: data?.price ?? 'prices.1sa21d5ad51as5d1as5',
      quantity: data?.quantity ?? 1,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
