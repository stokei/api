import { ForbiddenException } from '@nestjs/common';

export class PlanUnauthorizedException extends ForbiddenException {
  constructor() {
    super('planUnauthorized');
  }
}
