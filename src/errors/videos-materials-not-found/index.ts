import { NotFoundException } from '@nestjs/common';

export class VideosMaterialsNotFoundException extends NotFoundException {
  constructor() {
    super('videosMaterialsNotFound');
  }
}
