import { NotFoundException } from '@nestjs/common';

export class PlanNotFoundException extends NotFoundException {
  constructor() {
    super('planNotFound');
  }
}
