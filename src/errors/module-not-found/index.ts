import { NotFoundException } from '@nestjs/common';

export class ModuleNotFoundException extends NotFoundException {
  constructor() {
    super('moduleNotFound');
  }
}
