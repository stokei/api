import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IImageModelData, ImageModel } from '@/models/image.model';

export class ImageModelMock extends ImageModel {
  constructor(data?: Partial<IImageModelData>) {
    super({
      _id: nanoid(),
      path: data?.path ?? '/image/MY_IMAGE_ID',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
