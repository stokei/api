import { NotFoundException } from '@nestjs/common';

export class ComponentsNotFoundException extends NotFoundException {
  constructor() {
    super('componentsNotFound');
  }
}
