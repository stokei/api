import { NotFoundException } from '@nestjs/common';

export class AccessesNotFoundException extends NotFoundException {
  constructor() {
    super('accessesNotFound');
  }
}
