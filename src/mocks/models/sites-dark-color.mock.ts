import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  ISitesDarkColorModelData,
  SitesDarkColorModel
} from '@/models/sites-dark-color.model';

export class SitesDarkColorModelMock extends SitesDarkColorModel {
  constructor(data?: Partial<ISitesDarkColorModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'SitesDarkColor Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
