import { NotFoundException } from '@nestjs/common';

export class SitesNotFoundException extends NotFoundException {
  constructor() {
    super('sitesNotFound');
  }
}
