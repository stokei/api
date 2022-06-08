import { NotFoundException } from '@nestjs/common';

export class MetatagNotFoundException extends NotFoundException {
  constructor() {
    super('metatagNotFound');
  }
}
