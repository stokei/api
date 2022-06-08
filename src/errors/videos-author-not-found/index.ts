import { NotFoundException } from '@nestjs/common';

export class VideosAuthorNotFoundException extends NotFoundException {
  constructor() {
    super('videosAuthorNotFound');
  }
}
