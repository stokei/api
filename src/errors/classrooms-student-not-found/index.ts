import { NotFoundException } from '@nestjs/common';

export class ClassroomsStudentNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsStudentNotFound');
  }
}
