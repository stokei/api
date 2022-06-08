import { OrderModel, IOrderModelData } from '@/models/order.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
