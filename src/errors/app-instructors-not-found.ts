import { NotFoundException } from '@nestjs/common';

export class AppInstructorsNotFoundException extends NotFoundException {
  constructor() {
    super('appInstructorsNotFound');
  }
}
