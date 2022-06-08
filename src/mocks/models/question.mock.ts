import { QuestionModel, IQuestionModelData } from '@/models/question.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class QuestionModelMock extends QuestionModel {
  constructor(data?: Partial<IQuestionModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Question Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
