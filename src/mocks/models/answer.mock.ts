import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { AnswerModel, IAnswerModelData } from '@/models/answer.model';

export class AnswerModelMock extends AnswerModel {
  constructor(data?: Partial<IAnswerModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Answer Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
