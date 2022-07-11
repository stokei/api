import { NotFoundException } from '@nestjs/common';

export class ClassroomsNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsNotFound');
  }
}
