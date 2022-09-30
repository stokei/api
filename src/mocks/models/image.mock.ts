import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IImageModelData, ImageModel } from '@/models/image.model';

export class ImageModelMock extends ImageModel {
  constructor(data?: Partial<IImageModelData>) {
    super({
      _id: nanoid(),
      filename: data?.filename ?? '/image/MY_IMAGE_ID',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
