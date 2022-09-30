import { BadRequestException } from '@nestjs/common';

export class QencodeSignatureNotFoundException extends BadRequestException {
  constructor() {
    super('qencodeSignatureNotFound');
  }
}
