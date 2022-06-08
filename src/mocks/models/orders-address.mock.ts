import {
  OrdersAddressModel,
  IOrdersAddressModelData
} from '@/models/orders-address.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class OrdersAddressModelMock extends OrdersAddressModel {
  constructor(data?: Partial<IOrdersAddressModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'OrdersAddress Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
