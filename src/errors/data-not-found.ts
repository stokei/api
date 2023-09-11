import { BadRequestException } from '@nestjs/common';

export class DataNotFoundException extends BadRequestException {
  constructor() {
    super('dataNotFound');
  }
}
