import { NotFoundException } from '@nestjs/common';

export class ImagesNotFoundException extends NotFoundException {
  constructor() {
    super('imagesNotFound');
  }
}
