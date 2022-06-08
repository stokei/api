import { NotFoundException } from '@nestjs/common';

export class ClassroomsInstructorsNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsInstructorsNotFound');
  }
}
