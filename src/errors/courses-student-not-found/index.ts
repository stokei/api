import { NotFoundException } from '@nestjs/common';

export class CoursesStudentNotFoundException extends NotFoundException {
  constructor() {
    super('coursesStudentNotFound');
  }
}
