import { NotFoundException } from '@nestjs/common';

export class HeroNotFoundException extends NotFoundException {
  constructor() {
    super('heroNotFound');
  }
}
