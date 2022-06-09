import { convertToISODateString } from '@stokei/nestjs';

import { AnswerEntity } from '@/entities';
import { AnswerModel } from '@/models/answer.model';

export class AnswerMapper {
  toModel(answer: AnswerEntity) {
    return (
      answer &&
      new AnswerModel({
        ...answer,
        updatedAt: convertToISODateString(answer.updatedAt),
        createdAt: convertToISODateString(answer.createdAt)
      })
    );
  }
  toModels(answers: AnswerEntity[]) {
    return answers?.length > 0 ? answers.map(this.toModel).filter(Boolean) : [];
  }
}
