import { BadRequestException } from '@nestjs/common';

export class ClassroomAlreadyActivateException extends BadRequestException {
  constructor() {
    super('classroomAlreadyActivate');
  }
}
