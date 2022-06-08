import { NotFoundException } from '@nestjs/common';

export class CoursesInstructorsNotFoundException extends NotFoundException {
  constructor() {
    super('coursesInstructorsNotFound');
  }
}
