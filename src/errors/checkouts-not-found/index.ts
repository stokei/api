import { NotFoundException } from '@nestjs/common';

export class CheckoutsNotFoundException extends NotFoundException {
  constructor() {
    super('checkoutsNotFound');
  }
}
