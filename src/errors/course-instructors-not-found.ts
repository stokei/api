import { NotFoundException } from '@nestjs/common';

export class CourseInstructorsNotFoundException extends NotFoundException {
  constructor() {
    super('courseInstructorsNotFound');
  }
}
