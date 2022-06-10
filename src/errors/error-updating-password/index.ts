import { BadRequestException } from '@nestjs/common';

export class ErrorUpdatingPasswordException extends BadRequestException {
  constructor() {
    super('errorUpdatingPassword');
  }
}
