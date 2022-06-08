import { convertToISODateString } from '@stokei/nestjs';
import { VideosAuthorEntity } from '@/entities';
import { VideosAuthorModel } from '@/models/videos-author.model';

export class VideosAuthorMapper {
  toModel(videosAuthor: VideosAuthorEntity) {
    return (
      videosAuthor &&
      new VideosAuthorModel({
        ...videosAuthor,
        updatedAt: convertToISODateString(videosAuthor.updatedAt),
        createdAt: convertToISODateString(videosAuthor.createdAt)
      })
    );
  }
  toModels(videosAuthors: VideosAuthorEntity[]) {
    return videosAuthors?.length > 0
      ? videosAuthors.map(this.toModel).filter(Boolean)
      : [];
  }
}
