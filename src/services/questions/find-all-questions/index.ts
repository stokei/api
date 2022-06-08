import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { QuestionModel } from '@/models/question.model';
import { FindAllQuestionsDTO } from '@/dtos/questions/find-all-questions.dto';
import { FindAllQuestionsQuery } from '@/queries/implements/questions/find-all-questions.query';

@Injectable()
export class FindAllQuestionsService
  implements
    IBaseService<FindAllQuestionsDTO, Promise<IPaginatedType<QuestionModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllQuestionsDTO
  ): Promise<IPaginatedType<QuestionModel>> {
    return await this.queryBus.execute(new FindAllQuestionsQuery(data));
  }
}
