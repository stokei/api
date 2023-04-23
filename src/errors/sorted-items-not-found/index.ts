import { NotFoundException } from '@nestjs/common';

export class SortedItemsNotFoundException extends NotFoundException {
  constructor() {
    super('sortedItemsNotFound');
  }
}
