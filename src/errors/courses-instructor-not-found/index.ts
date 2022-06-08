import { NotFoundException } from '@nestjs/common';

export class CoursesInstructorNotFoundException extends NotFoundException {
  constructor() {
    super('coursesInstructorNotFound');
  }
}
