import { AnswerModel } from '@/models/answer.model';

interface IDataAnswerRemovedEvent {
  readonly answer: AnswerModel;
}

export class AnswerRemovedEvent {
  readonly answer: AnswerModel;

  constructor(data: IDataAnswerRemovedEvent) {
    this.answer = data.answer;
  }
}
