import { BadRequestException } from '@nestjs/common';

export class OrderAlreadyPaidException extends BadRequestException {
  constructor() {
    super('orderAlreadyPaid');
  }
}
