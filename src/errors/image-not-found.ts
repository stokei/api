import { NotFoundException } from '@nestjs/common';

export class ImageNotFoundException extends NotFoundException {
  constructor() {
    super('imageNotFound');
  }
}
