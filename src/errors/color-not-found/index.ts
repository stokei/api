import { NotFoundException } from '@nestjs/common';

export class ColorNotFoundException extends NotFoundException {
  constructor() {
    super('colorNotFound');
  }
}
