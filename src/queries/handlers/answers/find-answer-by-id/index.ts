import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  AnswerNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { AnswerModel } from '@/models/answer.model';
import { FindAnswerByIdRepository } from '@/repositories/answers/find-answer-by-id';
import { FindAnswerByIdQuery } from '@/queries/implements/answers/find-answer-by-id.query';

@QueryHandler(FindAnswerByIdQuery)
export class FindAnswerByIdQueryHandler
  implements IQueryHandler<FindAnswerByIdQuery>
{
  constructor(
    private readonly findAnswerByIdRepository: FindAnswerByIdRepository
  ) {}

  async execute(query: FindAnswerByIdQuery): Promise<AnswerModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const answer = await this.findAnswerByIdRepository.execute(id);
    if (!answer) {
      throw new AnswerNotFoundException();
    }
    return answer;
  }
}
