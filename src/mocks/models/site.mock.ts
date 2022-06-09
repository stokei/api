import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { ISiteModelData, SiteModel } from '@/models/site.model';

export class SiteModelMock extends SiteModel {
  constructor(data?: Partial<ISiteModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Site Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
