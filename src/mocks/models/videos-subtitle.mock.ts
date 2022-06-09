import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IVideosSubtitleModelData,
  VideosSubtitleModel
} from '@/models/videos-subtitle.model';

export class VideosSubtitleModelMock extends VideosSubtitleModel {
  constructor(data?: Partial<IVideosSubtitleModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'VideosSubtitle Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
