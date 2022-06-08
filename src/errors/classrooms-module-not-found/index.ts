import { NotFoundException } from '@nestjs/common';

export class ClassroomsModuleNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsModuleNotFound');
  }
}
