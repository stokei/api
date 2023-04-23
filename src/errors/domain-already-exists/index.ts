import { BadRequestException } from '@nestjs/common';

export class DomainAlreadyExistsException extends BadRequestException {
  constructor() {
    super('domainAlreadyExists');
  }
}
