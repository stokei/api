import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { ColorModel, IColorModelData } from '@/models/color.model';

export class ColorModelMock extends ColorModel {
  constructor(data?: Partial<IColorModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Color Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
