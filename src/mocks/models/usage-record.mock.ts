import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { UsageRecordAction } from '@/enums/usage-record-action.enum';
import {
  IUsageRecordModelData,
  UsageRecordModel
} from '@/models/usage-record.model';

export class UsageRecordModelMock extends UsageRecordModel {
  constructor(data?: Partial<IUsageRecordModelData>) {
    super({
      _id: data?.id ?? nanoid(),
      parent: data?.parent ?? 'anyParent',
      app: data?.app ?? 'apps.dsaudhuashd454',
      quantity: data?.quantity ?? 1,
      action: data?.action ?? UsageRecordAction.INCREMENT,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
