import { NotFoundException } from '@nestjs/common';

export class RecurringsNotFoundException extends NotFoundException {
  constructor() {
    super('recurringsNotFound');
  }
}
