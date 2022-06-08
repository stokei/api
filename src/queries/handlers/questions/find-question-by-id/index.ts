import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  QuestionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { QuestionModel } from '@/models/question.model';
import { FindQuestionByIdRepository } from '@/repositories/questions/find-question-by-id';
import { FindQuestionByIdQuery } from '@/queries/implements/questions/find-question-by-id.query';

@QueryHandler(FindQuestionByIdQuery)
export class FindQuestionByIdQueryHandler
  implements IQueryHandler<FindQuestionByIdQuery>
{
  constructor(
    private readonly findQuestionByIdRepository: FindQuestionByIdRepository
  ) {}

  async execute(query: FindQuestionByIdQuery): Promise<QuestionModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const question = await this.findQuestionByIdRepository.execute(id);
    if (!question) {
      throw new QuestionNotFoundException();
    }
    return question;
  }
}
