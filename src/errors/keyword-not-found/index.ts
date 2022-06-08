import { NotFoundException } from '@nestjs/common';

export class KeywordNotFoundException extends NotFoundException {
  constructor() {
    super('keywordNotFound');
  }
}
