import { NotFoundException } from '@nestjs/common';

export class ModulesMaterialsNotFoundException extends NotFoundException {
  constructor() {
    super('modulesMaterialsNotFound');
  }
}
