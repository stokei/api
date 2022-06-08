import { NotFoundException } from '@nestjs/common';

export class ClassroomsTagNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsTagNotFound');
  }
}
