import { AnswerModel } from '@/models/answer.model';

interface IDataAnswerCreatedEvent {
  readonly answer: AnswerModel;
}

export class AnswerCreatedEvent {
  readonly answer: AnswerModel;

  constructor(data: IDataAnswerCreatedEvent) {
    this.answer = data.answer;
  }
}
