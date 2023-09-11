import { NotFoundException } from '@nestjs/common';

export class SiteNotFoundException extends NotFoundException {
  constructor() {
    super('siteNotFound');
  }
}
