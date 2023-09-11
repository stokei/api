import { NotFoundException } from '@nestjs/common';

export class CourseNotFoundException extends NotFoundException {
  constructor() {
    super('courseNotFound');
  }
}
