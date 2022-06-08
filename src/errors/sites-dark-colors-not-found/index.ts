import { NotFoundException } from '@nestjs/common';

export class SitesDarkColorsNotFoundException extends NotFoundException {
  constructor() {
    super('sitesDarkColorsNotFound');
  }
}
