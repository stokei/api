import { NotFoundException } from '@nestjs/common';

export class SitesDarkColorNotFoundException extends NotFoundException {
  constructor() {
    super('sitesDarkColorNotFound');
  }
}
