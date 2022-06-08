import { QuestionModel } from '@/models/question.model';

interface IDataQuestionRemovedEvent {
  readonly question: QuestionModel;
}

export class QuestionRemovedEvent {
  readonly question: QuestionModel;

  constructor(data: IDataQuestionRemovedEvent) {
    this.question = data.question;
  }
}
