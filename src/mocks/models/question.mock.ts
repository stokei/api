import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IQuestionModelData, QuestionModel } from '@/models/question.model';

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
