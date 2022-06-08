import { NotFoundException } from '@nestjs/common';

export class VideosSubtitleNotFoundException extends NotFoundException {
  constructor() {
    super('videosSubtitleNotFound');
  }
}
