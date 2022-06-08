import { NotFoundException } from '@nestjs/common';

export class VideosSubtitlesNotFoundException extends NotFoundException {
  constructor() {
    super('videosSubtitlesNotFound');
  }
}
