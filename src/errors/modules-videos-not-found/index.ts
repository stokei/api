import { NotFoundException } from '@nestjs/common';

export class ModulesVideosNotFoundException extends NotFoundException {
  constructor() {
    super('modulesVideosNotFound');
  }
}
