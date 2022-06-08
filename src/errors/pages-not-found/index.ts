import { NotFoundException } from '@nestjs/common';

export class PagesNotFoundException extends NotFoundException {
  constructor() {
    super('pagesNotFound');
  }
}
