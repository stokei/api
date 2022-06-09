import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { ITagModelData, TagModel } from '@/models/tag.model';

export class TagModelMock extends TagModel {
  constructor(data?: Partial<ITagModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Tag Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
