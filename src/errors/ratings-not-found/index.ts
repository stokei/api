import { NotFoundException } from '@nestjs/common';

export class RatingsNotFoundException extends NotFoundException {
  constructor() {
    super('ratingsNotFound');
  }
}
