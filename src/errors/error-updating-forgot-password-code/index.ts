import { BadRequestException } from '@nestjs/common';

export class ErrorUpdatingForgotPasswordCodeException extends BadRequestException {
  constructor() {
    super('errorUpdatingForgotPasswordCode');
  }
}
