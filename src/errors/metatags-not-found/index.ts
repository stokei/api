import { NotFoundException } from '@nestjs/common';

export class MetatagsNotFoundException extends NotFoundException {
  constructor() {
    super('metatagsNotFound');
  }
}
