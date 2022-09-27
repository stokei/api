import { BadRequestException } from '@nestjs/common';

export class ClassroomAlreadyDeactivateException extends BadRequestException {
  constructor() {
    super('classroomAlreadyDeactivate');
  }
}
