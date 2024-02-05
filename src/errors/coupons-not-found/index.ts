import { NotFoundException } from '@nestjs/common';

export class CouponsNotFoundException extends NotFoundException {
  constructor() {
    super('couponsNotFound');
  }
}
