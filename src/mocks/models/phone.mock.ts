import { PhoneModel, IPhoneModelData } from '@/models/phone.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class PhoneModelMock extends PhoneModel {
  constructor(data?: Partial<IPhoneModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Phone Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
