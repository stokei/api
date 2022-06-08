import { ImageModel, IImageModelData } from '@/models/image.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
