import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IPageModelData, PageModel } from '@/models/page.model';

export class PageModelMock extends PageModel {
  constructor(data?: Partial<IPageModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Page Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
