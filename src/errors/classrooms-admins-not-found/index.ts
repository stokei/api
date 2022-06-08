import { NotFoundException } from '@nestjs/common';

export class ClassroomsAdminsNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsAdminsNotFound');
  }
}
