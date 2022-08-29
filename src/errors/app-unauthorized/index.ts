import { BadRequestException } from '@nestjs/common';

export class AppUnauthorizedException extends BadRequestException {
  constructor() {
    super('appUnauthorized');
  }
}
