import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { QuestionModel } from '@/models/question.model';
import { FindQuestionByIdQuery } from '@/queries/implements/questions/find-question-by-id.query';

@Injectable()
export class FindQuestionByIdService
  implements IBaseService<string, Promise<QuestionModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<QuestionModel> {
    return await this.queryBus.execute(new FindQuestionByIdQuery(data));
  }
}
