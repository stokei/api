import { NotFoundException } from '@nestjs/common';

export class AppInstructorNotFoundException extends NotFoundException {
  constructor() {
    super('appInstructorNotFound');
  }
}
