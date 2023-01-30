import { BadRequestException } from '@nestjs/common';

export class ColorAlreadyExistsException extends BadRequestException {
  constructor() {
    super('colorAlreadyExists');
  }
}
