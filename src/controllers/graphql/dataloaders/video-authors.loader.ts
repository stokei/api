import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllVideoAuthorsService } from '@/services/video-authors/find-all-video-authors';

@Injectable({ scope: Scope.REQUEST })
export class VideoAuthorsLoader {
  constructor(
    private readonly videoAuthorsService: FindAllVideoAuthorsService
  ) {}

  readonly findByIds = new DataLoader(async (videoAuthorIds: string[]) => {
    const videoAuthors = await this.videoAuthorsService.execute({
      where: {
        AND: {
          ids: videoAuthorIds
        }
      }
    });
    const videoAuthorsMap = new Map(
      videoAuthors?.items?.map((videoAuthor) => [videoAuthor.id, videoAuthor])
    );
    return videoAuthorIds.map((videoAuthorId) =>
      videoAuthorsMap.get(videoAuthorId)
    );
  });
}
