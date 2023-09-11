import { NotFoundException } from '@nestjs/common';

export class VersionsNotFoundException extends NotFoundException {
  constructor() {
    super('versionsNotFound');
  }
}
