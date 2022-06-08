import { NotFoundException } from '@nestjs/common';

export class RatingNotFoundException extends NotFoundException {
  constructor() {
    super('ratingNotFound');
  }
}
