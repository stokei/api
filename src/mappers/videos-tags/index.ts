import { convertToISODateString } from '@stokei/nestjs';
import { VideosTagEntity } from '@/entities';
import { VideosTagModel } from '@/models/videos-tag.model';

export class VideosTagMapper {
  toModel(videosTag: VideosTagEntity) {
    return (
      videosTag &&
      new VideosTagModel({
        ...videosTag,
        updatedAt: convertToISODateString(videosTag.updatedAt),
        createdAt: convertToISODateString(videosTag.createdAt)
      })
    );
  }
  toModels(videosTags: VideosTagEntity[]) {
    return videosTags?.length > 0
      ? videosTags.map(this.toModel).filter(Boolean)
      : [];
  }
}
