import { BadRequestException } from '@nestjs/common';

export class ErrorRemovingFileException extends BadRequestException {
  constructor() {
    super('errorRemovingFile');
  }
}
