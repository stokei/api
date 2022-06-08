import { NotFoundException } from '@nestjs/common';

export class KeywordsNotFoundException extends NotFoundException {
  constructor() {
    super('keywordsNotFound');
  }
}
