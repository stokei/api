import { NotFoundException } from '@nestjs/common';

export class VideoAuthorsNotFoundException extends NotFoundException {
  constructor() {
    super('videoAuthorsNotFound');
  }
}
