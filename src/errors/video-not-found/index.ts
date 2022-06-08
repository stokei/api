import { NotFoundException } from '@nestjs/common';

export class VideoNotFoundException extends NotFoundException {
  constructor() {
    super('videoNotFound');
  }
}
