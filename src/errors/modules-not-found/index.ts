import { NotFoundException } from '@nestjs/common';

export class ModulesNotFoundException extends NotFoundException {
  constructor() {
    super('modulesNotFound');
  }
}
