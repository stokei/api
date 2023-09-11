import { BadRequestException } from '@nestjs/common';

export class CourseStudentAlreadyExistsException extends BadRequestException {
  constructor() {
    super('courseStudentAlreadyExists');
  }
}
