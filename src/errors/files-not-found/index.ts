import { NotFoundException } from '@nestjs/common';

export class FilesNotFoundException extends NotFoundException {
  constructor() {
    super('filesNotFound');
  }
}
