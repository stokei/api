import {
  OrdersItemModel,
  IOrdersItemModelData
} from '@/models/orders-item.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class OrdersItemModelMock extends OrdersItemModel {
  constructor(data?: Partial<IOrdersItemModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'OrdersItem Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
