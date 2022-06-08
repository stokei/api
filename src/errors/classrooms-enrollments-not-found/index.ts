import { NotFoundException } from '@nestjs/common';

export class ClassroomsEnrollmentsNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsEnrollmentsNotFound');
  }
}
