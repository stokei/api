import { NotFoundException } from '@nestjs/common';

export class SitesLightColorsNotFoundException extends NotFoundException {
  constructor() {
    super('sitesLightColorsNotFound');
  }
}
