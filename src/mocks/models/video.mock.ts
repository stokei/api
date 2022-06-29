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
      path: data?.path ?? '/videos/any_video',
      description: data?.description ?? null,
      poster: data?.poster ?? null,
      duration: data?.duration ?? 60000,
      status: data?.status ?? VideoStatus.ACTIVE,
      active: data?.active ?? true,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
