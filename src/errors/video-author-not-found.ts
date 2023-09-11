import { NotFoundException } from '@nestjs/common';

export class VideoAuthorNotFoundException extends NotFoundException {
  constructor() {
    super('videoAuthorNotFound');
  }
}
