import { convertToISODateString } from '@stokei/nestjs';
import { VideoEntity } from '@/entities';
import { VideoModel } from '@/models/video.model';

export class VideoMapper {
  toModel(video: VideoEntity) {
    return (
      video &&
      new VideoModel({
        ...video,
        updatedAt: convertToISODateString(video.updatedAt),
        createdAt: convertToISODateString(video.createdAt)
      })
    );
  }
  toModels(videos: VideoEntity[]) {
    return videos?.length > 0 ? videos.map(this.toModel).filter(Boolean) : [];
  }
}
