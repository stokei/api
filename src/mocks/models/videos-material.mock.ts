import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IVideosMaterialModelData,
  VideosMaterialModel
} from '@/models/videos-material.model';

export class VideosMaterialModelMock extends VideosMaterialModel {
  constructor(data?: Partial<IVideosMaterialModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'VideosMaterial Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
