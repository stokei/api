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
      _id: data?.id ?? nanoid(),
      parent: data?.parent ?? 'anyParent',
      paymentMethod: data?.paymentMethod ?? 'pay_method.ssadasdsa',
      stripeSubscription: data?.stripeSubscription ?? 'anySubscription',
      status: data?.status ?? SubscriptionContractStatus.PENDING,
      type: data?.type ?? SubscriptionContractType.RECURRING,
      automaticRenew: data?.automaticRenew ?? true,
      startAt: data?.startAt ?? null,
      endAt: data?.endAt ?? null,
      app: data?.app ?? 'apps.dsaudhuashd454',
      active: data?.active ?? true,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      createdByAdmin: data?.createdByAdmin ?? false,
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
