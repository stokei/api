import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { VideoStatus } from '@/enums/video-status.enum';
import { IVideoModelData, VideoModel } from '@/models/video.model';

export class VideoModelMock extends VideoModel {
  constructor(data?: Partial<IVideoModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Video Name',
      slug: data?.slug ?? 'video-name',
      parent: data?.parent ?? 'anyParent',
      filename: data?.filename ?? '/videos/any_video',
      url: data?.url ?? null,
      description: data?.description ?? null,
      poster: data?.poster ?? null,
      duration: data?.duration ?? 60000,
      status: data?.status ?? VideoStatus.ACTIVE,
      active: data?.active ?? true,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
