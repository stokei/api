import { Injectable, Scope } from '@nestjs/common';
import { FindAllVideosService } from '@/services/videos/find-all-videos';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class VideosLoader {
  constructor(private readonly videosService: FindAllVideosService) {}

  readonly findByIds = new DataLoader(async (videoIds: string[]) => {
    const videos = await this.videosService.execute({
      where: {
        AND: {
          ids: videoIds
        }
      }
    });
    const videosMap = new Map(videos?.items?.map((video) => [video.id, video]));
    return videoIds.map((videoId) => videosMap.get(videoId));
  });
}
