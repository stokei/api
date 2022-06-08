import { NotFoundException } from '@nestjs/common';

export class ActivityNotFoundException extends NotFoundException {
  constructor() {
    super('activityNotFound');
  }
}
