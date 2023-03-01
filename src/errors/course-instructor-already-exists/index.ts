import { BadRequestException } from '@nestjs/common';

export class CourseInstructorAlreadyExistsException extends BadRequestException {
  constructor() {
    super('courseInstructorAlreadyExists');
  }
}
