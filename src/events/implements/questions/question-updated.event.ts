import { QuestionModel } from '@/models/question.model';

interface IDataQuestionUpdatedEvent {
  readonly question: QuestionModel;
}

export class QuestionUpdatedEvent {
  readonly question: QuestionModel;

  constructor(data: IDataQuestionUpdatedEvent) {
    this.question = data.question;
  }
}
