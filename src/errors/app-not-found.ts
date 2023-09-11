import { NotFoundException } from '@nestjs/common';

export class AppNotFoundException extends NotFoundException {
  constructor() {
    super('appNotFound');
  }
}
