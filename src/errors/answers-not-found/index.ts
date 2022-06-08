import { NotFoundException } from '@nestjs/common';

export class AnswersNotFoundException extends NotFoundException {
  constructor() {
    super('answersNotFound');
  }
}
