import { NotFoundException } from '@nestjs/common';

export class ColorsNotFoundException extends NotFoundException {
  constructor() {
    super('colorsNotFound');
  }
}
