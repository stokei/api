import { MetatagModel, IMetatagModelData } from '@/models/metatag.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class MetatagModelMock extends MetatagModel {
  constructor(data?: Partial<IMetatagModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Metatag Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
