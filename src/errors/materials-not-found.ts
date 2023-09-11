import { NotFoundException } from '@nestjs/common';

export class MaterialsNotFoundException extends NotFoundException {
  constructor() {
    super('materialsNotFound');
  }
}
