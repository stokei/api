import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IVideosAuthorModelData,
  VideosAuthorModel
} from '@/models/videos-author.model';

export class VideosAuthorModelMock extends VideosAuthorModel {
  constructor(data?: Partial<IVideosAuthorModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'VideosAuthor Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
