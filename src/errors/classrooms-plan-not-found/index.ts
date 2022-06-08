import { NotFoundException } from '@nestjs/common';

export class ClassroomsPlanNotFoundException extends NotFoundException {
  constructor() {
    super('classroomsPlanNotFound');
  }
}
