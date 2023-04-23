import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IVideoModelData, VideoModel } from '@/models/video.model';

export class VideoModelMock extends VideoModel {
  constructor(data?: Partial<IVideoModelData>) {
    super({
      _id: data?.id ?? nanoid(),
      name: data?.name ?? 'Video Name',
      slug: data?.slug ?? 'video-name',
      parent: data?.parent ?? 'anyParent',
      file: data?.file ?? 'anyParent',
      description: data?.description ?? null,
      poster: data?.poster ?? null,
      active: data?.active ?? true,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
