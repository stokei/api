import { NotFoundException } from '@nestjs/common';

export class AppAdminsNotFoundException extends NotFoundException {
  constructor() {
    super('appAdminsNotFound');
  }
}
