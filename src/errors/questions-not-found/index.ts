import { NotFoundException } from '@nestjs/common';

export class QuestionsNotFoundException extends NotFoundException {
  constructor() {
    super('questionsNotFound');
  }
}
