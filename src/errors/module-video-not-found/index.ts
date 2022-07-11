import { NotFoundException } from '@nestjs/common';

export class ModuleVideoNotFoundException extends NotFoundException {
  constructor() {
    super('moduleVideoNotFound');
  }
}
