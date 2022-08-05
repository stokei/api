import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';
import {
  ISubscriptionContractModelData,
  SubscriptionContractModel
} from '@/models/subscription-contract.model';

export class SubscriptionContractModelMock extends SubscriptionContractModel {
  constructor(data?: Partial<ISubscriptionContractModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'parents.ss4d84asdsa5d1as5',
      product: data?.product ?? 'plans.5a1sd5as1das',
      type: data?.type ?? SubscriptionContractType.RECURRING,
      status: data?.status ?? SubscriptionContractStatus.ACTIVE,
      active: data?.active ?? true,
      automaticRenew: data?.automaticRenew ?? false,
      startAt: data?.startAt ?? convertToISODateString(Date.now()),
      endAt: data?.endAt ?? convertToISODateString(Date.now() + 60000),
      canceledAt: data?.canceledAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}