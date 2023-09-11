import { NotFoundException } from '@nestjs/common';

export class UsageRecordNotFoundException extends NotFoundException {
  constructor() {
    super('usageRecordNotFound');
  }
}
