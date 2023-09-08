import { BadRequestException } from '@nestjs/common';

export class SlugAlreadyExistsException extends BadRequestException {
  constructor() {
    super('slugAlreadyExists');
  }
}
