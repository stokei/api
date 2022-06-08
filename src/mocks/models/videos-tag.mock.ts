import { VideosTagModel, IVideosTagModelData } from '@/models/videos-tag.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
