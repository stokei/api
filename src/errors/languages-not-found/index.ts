import { NotFoundException } from '@nestjs/common';

export class LanguagesNotFoundException extends NotFoundException {
  constructor() {
    super('languagesNotFound');
  }
}
