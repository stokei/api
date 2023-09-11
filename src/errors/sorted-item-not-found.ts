import { NotFoundException } from '@nestjs/common';

export class SortedItemNotFoundException extends NotFoundException {
  constructor() {
    super('sortedItemNotFound');
  }
}
