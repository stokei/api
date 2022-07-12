import { NotFoundException } from '@nestjs/common';

export class ClassroomModulesNotFoundException extends NotFoundException {
  constructor() {
    super('classroomModulesNotFound');
  }
}
