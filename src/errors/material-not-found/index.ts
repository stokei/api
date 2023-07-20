import { NotFoundException } from '@nestjs/common';

export class MaterialNotFoundException extends NotFoundException {
  constructor() {
    super('materialNotFound');
  }
}
