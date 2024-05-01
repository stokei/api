import { NotFoundException } from '@nestjs/common';

export class CourseStudentNotFoundException extends NotFoundException {
  constructor() {
    super('courseStudentNotFound');
  }
}
