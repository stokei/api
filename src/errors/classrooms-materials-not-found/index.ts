import { NotFoundException } from '@nestjs/common';

export class ClassroomsMaterialsNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsMaterialsNotFound');
  }
}
