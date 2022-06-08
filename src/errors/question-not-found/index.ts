import { NotFoundException } from '@nestjs/common';

export class QuestionNotFoundException extends NotFoundException {
  constructor() {
    super('questionNotFound');
  }
}
