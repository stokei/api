import { convertToISODateString } from '@stokei/nestjs';
import { QuestionEntity } from '@/entities';
import { QuestionModel } from '@/models/question.model';

export class QuestionMapper {
  toModel(question: QuestionEntity) {
    return (
      question &&
      new QuestionModel({
        ...question,
        updatedAt: convertToISODateString(question.updatedAt),
        createdAt: convertToISODateString(question.createdAt)
      })
    );
  }
  toModels(questions: QuestionEntity[]) {
    return questions?.length > 0
      ? questions.map(this.toModel).filter(Boolean)
      : [];
  }
}
