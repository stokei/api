import { NotFoundException } from '@nestjs/common';

export class ClassroomsEnrollmentNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsEnrollmentNotFound');
  }
}
