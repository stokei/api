import { NotFoundException } from '@nestjs/common';

export class VideosTagsNotFoundException extends NotFoundException {
  constructor() {
    super('videosTagsNotFound');
  }
}
