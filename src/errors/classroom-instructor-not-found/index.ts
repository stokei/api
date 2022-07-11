import { NotFoundException } from '@nestjs/common';

export class ClassroomInstructorNotFoundException extends NotFoundException {
  constructor() {
    super('classroomInstructorNotFound');
  }
}
