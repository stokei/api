import { Injectable, Scope } from '@nestjs/common';
import { FindAllVideosAuthorsService } from '@/services/videos-authors/find-all-videos-authors';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class VideosAuthorsLoader {
  constructor(
    private readonly videosAuthorsService: FindAllVideosAuthorsService
  ) {}

  readonly findByIds = new DataLoader(async (videosAuthorIds: string[]) => {
    const videosAuthors = await this.videosAuthorsService.execute({
      where: {
        AND: {
          ids: videosAuthorIds
        }
      }
    });
    const videosAuthorsMap = new Map(
      videosAuthors?.items?.map((videosAuthor) => [
        videosAuthor.id,
        videosAuthor
      ])
    );
    return videosAuthorIds.map((videosAuthorId) =>
      videosAuthorsMap.get(videosAuthorId)
    );
  });
}
