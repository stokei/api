import { NotFoundException } from '@nestjs/common';

export class DomainsNotFoundException extends NotFoundException {
  constructor() {
    super('domainsNotFound');
  }
}
