import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  ISubscriptionContractItemModelData,
  SubscriptionContractItemModel
} from '@/models/subscription-contract-item.model';

export class SubscriptionContractItemModelMock extends SubscriptionContractItemModel {
  constructor(data?: Partial<ISubscriptionContractItemModelData>) {
    super({
      _id: data?.id ?? nanoid(),
      parent: data?.parent ?? 'anyParent',
      app: data?.app ?? 'apps.dsaudhuashd454',
      product: data?.product ?? 'prod.dsaudhuashd454',
      quantity: data?.quantity ?? 1,
      price: data?.price ?? 'price.dsaudhuashd454',
      stripeSubscriptionItem:
        data?.stripeSubscriptionItem ?? 'anySubscriptionItem',
      recurring: data?.recurring ?? 'recurring.dsaudhuashd454',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
