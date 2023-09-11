import { NotFoundException } from '@nestjs/common';

export class VideosNotFoundException extends NotFoundException {
  constructor() {
    super('videosNotFound');
  }
}
