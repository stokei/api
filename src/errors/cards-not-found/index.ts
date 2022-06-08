import { NotFoundException } from '@nestjs/common';

export class CardsNotFoundException extends NotFoundException {
  constructor() {
    super('cardsNotFound');
  }
}
