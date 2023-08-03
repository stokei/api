import { BadRequestException } from '@nestjs/common';

export class PagarmeAccountAlreadyExistsException extends BadRequestException {
  constructor() {
    super('pagarmeAccountAlreadyExists');
  }
}
