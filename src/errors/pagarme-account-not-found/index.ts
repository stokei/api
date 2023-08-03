import { BadRequestException } from '@nestjs/common';

export class PagarmeAccountNotFoundException extends BadRequestException {
  constructor() {
    super('pagarmeAccountNotFound');
  }
}
