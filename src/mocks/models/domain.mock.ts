import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { DomainModel, IDomainModelData } from '@/models/domain.model';

export class DomainModelMock extends DomainModel {
  constructor(data?: Partial<IDomainModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Domain Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
