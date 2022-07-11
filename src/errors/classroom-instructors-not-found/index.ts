import { NotFoundException } from '@nestjs/common';

export class ClassroomInstructorsNotFoundException extends NotFoundException {
  constructor() {
    super('classroomInstructorsNotFound');
  }
}
