import { NotFoundException } from '@nestjs/common';

export class VideosAuthorsNotFoundException extends NotFoundException {
  constructor() {
    super('videosAuthorsNotFound');
  }
}
