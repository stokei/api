import { ForbiddenException } from '@nestjs/common';

export class UserUnauthorizedException extends ForbiddenException {
  constructor() {
    super('userUnauthorized');
  }
}
