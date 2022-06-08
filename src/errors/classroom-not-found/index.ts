import { NotFoundException } from '@nestjs/common';

export class ClassroomNotFoundException extends NotFoundException {
  constructor() {
    super('classroomNotFound');
  }
}
