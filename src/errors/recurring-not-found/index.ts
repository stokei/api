import { NotFoundException } from '@nestjs/common';

export class RecurringNotFoundException extends NotFoundException {
  constructor() {
    super('recurringNotFound');
  }
}
