import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  ISitesLightColorModelData,
  SitesLightColorModel
} from '@/models/sites-light-color.model';

export class SitesLightColorModelMock extends SitesLightColorModel {
  constructor(data?: Partial<ISitesLightColorModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'SitesLightColor Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
