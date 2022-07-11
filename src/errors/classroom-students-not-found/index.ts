import { NotFoundException } from '@nestjs/common';

export class ClassroomStudentsNotFoundException extends NotFoundException {
  constructor() {
    super('classroomStudentsNotFound');
  }
}
