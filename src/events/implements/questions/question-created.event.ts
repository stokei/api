import { QuestionModel } from '@/models/question.model';

interface IDataQuestionCreatedEvent {
  readonly question: QuestionModel;
}

export class QuestionCreatedEvent {
  readonly question: QuestionModel;

  constructor(data: IDataQuestionCreatedEvent) {
    this.question = data.question;
  }
}
