import {
  VideosAuthorModel,
  IVideosAuthorModelData
} from '@/models/videos-author.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
