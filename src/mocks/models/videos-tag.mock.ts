import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IVideosTagModelData, VideosTagModel } from '@/models/videos-tag.model';

export class VideosTagModelMock extends VideosTagModel {
  constructor(data?: Partial<IVideosTagModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'VideosTag Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
