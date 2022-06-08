import { NotFoundException } from '@nestjs/common';

export class ClassroomsInstructorNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsInstructorNotFound');
  }
}
