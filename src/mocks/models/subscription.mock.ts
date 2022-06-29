import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { SubscriptionStatus } from '@/enums/subscription-status.enum';
import {
  ISubscriptionModelData,
  SubscriptionModel
} from '@/models/subscription.model';

export class SubscriptionModelMock extends SubscriptionModel {
  constructor(data?: Partial<ISubscriptionModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'parents.ss4d84asdsa5d1as5',
      product: data?.product ?? 'plans.5a1sd5as1das',
      status: data?.status ?? SubscriptionStatus.ACTIVE,
      active: data?.active ?? true,
      startAt: data?.startAt ?? convertToISODateString(Date.now()),
      endAt: data?.endAt ?? convertToISODateString(Date.now() + 60000),
      canceledAt: data?.canceledAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
