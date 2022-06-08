import {
  SitesDarkColorModel,
  ISitesDarkColorModelData
} from '@/models/sites-dark-color.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
