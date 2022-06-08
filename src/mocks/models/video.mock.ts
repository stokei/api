import { VideoModel, IVideoModelData } from '@/models/video.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class VideoModelMock extends VideoModel {
  constructor(data?: Partial<IVideoModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Video Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
