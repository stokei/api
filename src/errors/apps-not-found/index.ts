import { NotFoundException } from '@nestjs/common';

export class AppsNotFoundException extends NotFoundException {
  constructor() {
    super('appsNotFound');
  }
}
