import { NotFoundException } from '@nestjs/common';

export class ModulesVideoNotFoundException extends NotFoundException {
  constructor() {
    super('modulesVideoNotFound');
  }
}
