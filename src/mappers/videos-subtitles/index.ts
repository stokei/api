import { convertToISODateString } from '@stokei/nestjs';
import { VideosSubtitleEntity } from '@/entities';
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';

export class VideosSubtitleMapper {
  toModel(videosSubtitle: VideosSubtitleEntity) {
    return (
      videosSubtitle &&
      new VideosSubtitleModel({
        ...videosSubtitle,
        updatedAt: convertToISODateString(videosSubtitle.updatedAt),
        createdAt: convertToISODateString(videosSubtitle.createdAt)
      })
    );
  }
  toModels(videosSubtitles: VideosSubtitleEntity[]) {
    return videosSubtitles?.length > 0
      ? videosSubtitles.map(this.toModel).filter(Boolean)
      : [];
  }
}
