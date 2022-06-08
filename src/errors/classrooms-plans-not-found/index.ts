import { NotFoundException } from '@nestjs/common';

export class ClassroomsPlansNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsPlansNotFound');
  }
}
