import { AnswerModel } from '@/models/answer.model';

interface IDataAnswerUpdatedEvent {
  readonly answer: AnswerModel;
}

export class AnswerUpdatedEvent {
  readonly answer: AnswerModel;

  constructor(data: IDataAnswerUpdatedEvent) {
    this.answer = data.answer;
  }
}
