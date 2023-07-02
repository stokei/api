import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

export interface IVideoViewModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly video: string;
  readonly viewer: string;
  readonly viewedDuration: number;
  readonly videoDuration: number;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class VideoViewModel extends AggregateRoot {
  readonly id: string;
  readonly video: string;
  readonly viewer: string;
  readonly viewedDuration: number;
  readonly videoDuration: number;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IVideoViewModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VIDEO_VIEWS,
      id: data._id?.toString() || data.id
    });
    this.video = data.video;
    this.viewer = data.viewer;
    this.viewedDuration = data.viewedDuration;
    this.videoDuration = data.videoDuration;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }
}
