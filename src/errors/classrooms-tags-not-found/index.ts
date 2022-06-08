import { NotFoundException } from '@nestjs/common';

export class ClassroomsTagsNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsTagsNotFound');
  }
}
