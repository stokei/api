import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IOrdersSellerModelData,
  OrdersSellerModel
} from '@/models/orders-seller.model';

export class OrdersSellerModelMock extends OrdersSellerModel {
  constructor(data?: Partial<IOrdersSellerModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'OrdersSeller Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
