import { NotFoundException } from '@nestjs/common';

export class AppAdminNotFoundException extends NotFoundException {
  constructor() {
    super('appAdminNotFound');
  }
}
