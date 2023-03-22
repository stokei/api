import { BadRequestException } from '@nestjs/common';

export class InvalidFileException extends BadRequestException {
  constructor() {
    super('invalidFile');
  }
}
