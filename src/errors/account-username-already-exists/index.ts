import { BadRequestException } from '@nestjs/common';

export class AccountUsernameAlreadyExistsException extends BadRequestException {
  constructor() {
    super('accountUsernameAlreadyExists');
  }
}
