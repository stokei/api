import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IImageModelData, ImageModel } from '@/models/image.model';

export class ImageModelMock extends ImageModel {
  constructor(data?: Partial<IImageModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Image Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
