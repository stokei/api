import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { PhoneStatus } from '@/enums/phone-status.enum';
import { IPhoneModelData, PhoneModel } from '@/models/phone.model';

export class PhoneModelMock extends PhoneModel {
  constructor(data?: Partial<IPhoneModelData>) {
    super({
      _id: data?.id ?? nanoid(),
      parent: data?.parent ?? 'anyParent',
      fullnumber: data?.fullnumber ?? '1451999993333',
      countryCode: data?.countryCode ?? '14',
      areaCode: data?.areaCode ?? '51',
      number: data?.number ?? '999993333',
      validationCode: data?.validationCode ?? null,
      status: data?.status ?? PhoneStatus.ACTIVE,
      active: data?.active ?? true,
      activatedAt: data?.activatedAt ?? null,
      validatedAt: data?.validatedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
