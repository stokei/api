import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllVideosSubtitlesService } from '@/services/videos-subtitles/find-all-videos-subtitles';

@Injectable({ scope: Scope.REQUEST })
export class VideosSubtitlesLoader {
  constructor(
    private readonly videosSubtitlesService: FindAllVideosSubtitlesService
  ) {}

  readonly findByIds = new DataLoader(async (videosSubtitleIds: string[]) => {
    const videosSubtitles = await this.videosSubtitlesService.execute({
      where: {
        AND: {
          ids: videosSubtitleIds
        }
      }
    });
    const videosSubtitlesMap = new Map(
      videosSubtitles?.items?.map((videosSubtitle) => [
        videosSubtitle.id,
        videosSubtitle
      ])
    );
    return videosSubtitleIds.map((videosSubtitleId) =>
      videosSubtitlesMap.get(videosSubtitleId)
    );
  });
}
