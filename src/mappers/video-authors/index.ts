import { convertToISODateString } from '@stokei/nestjs';

import { VideoAuthorEntity } from '@/entities';
import { VideoAuthorModel } from '@/models/video-author.model';

export class VideoAuthorMapper {
  toModel(videoAuthor: VideoAuthorEntity) {
    return (
      videoAuthor &&
      new VideoAuthorModel({
        ...videoAuthor,
        updatedAt: convertToISODateString(videoAuthor.updatedAt),
        createdAt: convertToISODateString(videoAuthor.createdAt)
      })
    );
  }
  toModels(videoAuthors: VideoAuthorEntity[]) {
    return videoAuthors?.length > 0
      ? videoAuthors.map(this.toModel).filter(Boolean)
      : [];
  }
}
