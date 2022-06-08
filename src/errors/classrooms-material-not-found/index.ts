import { NotFoundException } from '@nestjs/common';

export class ClassroomsMaterialNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsMaterialNotFound');
  }
}
