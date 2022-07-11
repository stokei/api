import { NotFoundException } from '@nestjs/common';

export class ModuleVideosNotFoundException extends NotFoundException {
  constructor() {
    super('moduleVideosNotFound');
  }
}
