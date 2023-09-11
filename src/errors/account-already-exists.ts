import { BadRequestException } from '@nestjs/common';

export class AccountAlreadyExistsException extends BadRequestException {
  constructor() {
    super('accountAlreadyExists');
  }
}
