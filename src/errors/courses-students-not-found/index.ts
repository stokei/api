import { NotFoundException } from '@nestjs/common';

export class CoursesStudentsNotFoundException extends NotFoundException {
  constructor() {
    super('coursesStudentsNotFound');
  }
}
