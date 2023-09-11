import { NotFoundException } from '@nestjs/common';

export class CoursesNotFoundException extends NotFoundException {
  constructor() {
    super('coursesNotFound');
  }
}
