import { NotFoundException } from '@nestjs/common';

export class VersionNotFoundException extends NotFoundException {
  constructor() {
    super('versionNotFound');
  }
}
