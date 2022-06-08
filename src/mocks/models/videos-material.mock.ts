import {
  VideosMaterialModel,
  IVideosMaterialModelData
} from '@/models/videos-material.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
