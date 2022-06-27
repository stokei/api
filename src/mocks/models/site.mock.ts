import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { ISiteModelData, SiteModel } from '@/models/site.model';

export class SiteModelMock extends SiteModel {
  constructor(data?: Partial<ISiteModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      favicon: data?.favicon ?? null,
      logo: data?.logo ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
