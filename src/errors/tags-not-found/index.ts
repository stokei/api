import { NotFoundException } from '@nestjs/common';

export class TagsNotFoundException extends NotFoundException {
  constructor() {
    super('tagsNotFound');
  }
}
