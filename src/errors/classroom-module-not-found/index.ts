import { NotFoundException } from '@nestjs/common';

export class ClassroomModuleNotFoundException extends NotFoundException {
  constructor() {
    super('classroomModuleNotFound');
  }
}
