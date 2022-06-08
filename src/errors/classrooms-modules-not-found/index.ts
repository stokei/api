import { NotFoundException } from '@nestjs/common';

export class ClassroomsModulesNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsModulesNotFound');
  }
}
