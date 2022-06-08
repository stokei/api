import { NotFoundException } from '@nestjs/common';

export class ClassroomsStudentsNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsStudentsNotFound');
  }
}
