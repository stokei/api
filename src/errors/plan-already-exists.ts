import { BadRequestException } from '@nestjs/common';

export class PlanAlreadyExistsException extends BadRequestException {
  constructor() {
    super('planAlreadyExists');
  }
}
