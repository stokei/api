import { NotFoundException } from '@nestjs/common';

export class CourseInstructorNotFoundException extends NotFoundException {
  constructor() {
    super('courseInstructorNotFound');
  }
}
