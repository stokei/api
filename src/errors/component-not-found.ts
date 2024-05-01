import { NotFoundException } from '@nestjs/common';

export class ComponentNotFoundException extends NotFoundException {
  constructor() {
    super('componentNotFound');
  }
}
