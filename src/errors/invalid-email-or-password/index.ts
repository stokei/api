import { NotFoundException } from '@nestjs/common';

export class InvalidEmailOrPasswordException extends NotFoundException {
  constructor() {
    super('invalidEmailOrPassword');
  }
}
