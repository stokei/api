import { NotFoundException } from '@nestjs/common';

export class HerosNotFoundException extends NotFoundException {
  constructor() {
    super('herosNotFound');
  }
}
