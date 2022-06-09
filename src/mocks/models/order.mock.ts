import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IOrderModelData, OrderModel } from '@/models/order.model';

export class OrderModelMock extends OrderModel {
  constructor(data?: Partial<IOrderModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Order Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
