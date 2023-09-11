import { NotFoundException } from '@nestjs/common';

export class AccessNotFoundException extends NotFoundException {
  constructor() {
    super('accessNotFound');
  }
}
