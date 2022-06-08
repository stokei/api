import { NotFoundException } from '@nestjs/common';

export class ModulesMaterialNotFoundException extends NotFoundException {
  constructor() {
    super('modulesMaterialNotFound');
  }
}
