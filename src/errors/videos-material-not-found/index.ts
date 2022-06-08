import { NotFoundException } from '@nestjs/common';

export class VideosMaterialNotFoundException extends NotFoundException {
  constructor() {
    super('videosMaterialNotFound');
  }
}
