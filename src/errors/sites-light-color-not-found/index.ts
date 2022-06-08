import { NotFoundException } from '@nestjs/common';

export class SitesLightColorNotFoundException extends NotFoundException {
  constructor() {
    super('sitesLightColorNotFound');
  }
}
