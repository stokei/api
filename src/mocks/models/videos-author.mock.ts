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
      video: data?.video ?? 'videos.dsadhiad546asd',
      author: data?.author ?? 'VideosAuthor Name',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
