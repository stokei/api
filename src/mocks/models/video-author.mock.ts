import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IVideoAuthorModelData,
  VideoAuthorModel
} from '@/models/video-author.model';

export class VideoAuthorModelMock extends VideoAuthorModel {
  constructor(data?: Partial<IVideoAuthorModelData>) {
    super({
      _id: nanoid(),
      video: data?.video ?? 'videos.dsadhiad546asd',
      author: data?.author ?? 'VideoAuthor Name',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
