import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { AddressModel, IAddressModelData } from '@/models/address.model';

export class AddressModelMock extends AddressModel {
  constructor(data?: Partial<IAddressModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Address Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
