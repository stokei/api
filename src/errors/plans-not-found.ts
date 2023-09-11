import { NotFoundException } from '@nestjs/common';

export class PlansNotFoundException extends NotFoundException {
  constructor() {
    super('plansNotFound');
  }
}
