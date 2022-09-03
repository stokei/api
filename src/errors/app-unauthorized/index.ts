import { ForbiddenException } from '@nestjs/common';

export class AppUnauthorizedException extends ForbiddenException {
  constructor() {
    super('appUnauthorized');
  }
}
