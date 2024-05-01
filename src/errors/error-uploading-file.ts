import { BadRequestException } from '@nestjs/common';

export class ErrorUploadingFileException extends BadRequestException {
  constructor() {
    super('errorUploadingFile');
  }
}
