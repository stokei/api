import { NotFoundException } from '@nestjs/common';

export class ClassroomStudentNotFoundException extends NotFoundException {
  constructor() {
    super('classroomStudentNotFound');
  }
}
