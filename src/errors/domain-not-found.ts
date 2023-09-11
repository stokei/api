import { NotFoundException } from '@nestjs/common';

export class DomainNotFoundException extends NotFoundException {
  constructor() {
    super('domainNotFound');
  }
}
