import { Injectable, Scope } from '@nestjs/common';
import { FindAllVideosTagsService } from '@/services/videos-tags/find-all-videos-tags';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class VideosTagsLoader {
  constructor(private readonly videosTagsService: FindAllVideosTagsService) {}

  readonly findByIds = new DataLoader(async (videosTagIds: string[]) => {
    const videosTags = await this.videosTagsService.execute({
      where: {
        AND: {
          ids: videosTagIds
        }
      }
    });
    const videosTagsMap = new Map(
      videosTags?.items?.map((videosTag) => [videosTag.id, videosTag])
    );
    return videosTagIds.map((videosTagId) => videosTagsMap.get(videosTagId));
  });
}
