import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CartModel, ICartModelData } from '@/models/cart.model';

export class CartModelMock extends CartModel {
  constructor(data?: Partial<ICartModelData>) {
    super({
      _id: nanoid(),
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
