import { NotFoundException } from '@nestjs/common';

export class ClassroomsAdminNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsAdminNotFound');
  }
}
