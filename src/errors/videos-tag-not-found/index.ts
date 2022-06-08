import { NotFoundException } from '@nestjs/common';

export class VideosTagNotFoundException extends NotFoundException {
  constructor() {
    super('videosTagNotFound');
  }
}
