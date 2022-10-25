import { NotFoundException } from '@nestjs/common';

export class UsageRecordsNotFoundException extends NotFoundException {
  constructor() {
    super('usageRecordsNotFound');
  }
}
