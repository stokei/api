import { NotFoundException } from '@nestjs/common';

export class VideoViewNotFoundException extends NotFoundException {
  constructor() {
    super('videoViewNotFound');
  }
}
