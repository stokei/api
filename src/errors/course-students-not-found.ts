import { NotFoundException } from '@nestjs/common';

export class CourseStudentsNotFoundException extends NotFoundException {
  constructor() {
    super('courseStudentsNotFound');
  }
}
