import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { AddressModel, IAddressModelData } from '@/models/address.model';

export class AddressModelMock extends AddressModel {
  constructor(data?: Partial<IAddressModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      default: data?.default ?? false,
      street: data?.street ?? 'Av. Brasil',
      complement: data?.complement ?? 'Apto 704',
      number: data?.number ?? '1850',
      city: data?.city ?? 'Bagé',
      country: data?.country ?? 'BR',
      state: data?.state ?? 'RS',
      postalCode: data?.postalCode ?? '99999999',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
