import { SiteModel, ISiteModelData } from '@/models/site.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
