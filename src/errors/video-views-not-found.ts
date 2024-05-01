import { NotFoundException } from '@nestjs/common';

export class VideoViewsNotFoundException extends NotFoundException {
  constructor() {
    super('videoViewsNotFound');
  }
}
