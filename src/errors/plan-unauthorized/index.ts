import { BadRequestException } from '@nestjs/common';

export class PlanUnauthorizedException extends BadRequestException {
  constructor() {
    super('planUnauthorized');
  }
}
