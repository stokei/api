import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { AnswerModel } from '@/models/answer.model';
import { FindAnswerByIdQuery } from '@/queries/implements/answers/find-answer-by-id.query';

@Injectable()
export class FindAnswerByIdService
  implements IBaseService<string, Promise<AnswerModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<AnswerModel> {
    return await this.queryBus.execute(new FindAnswerByIdQuery(data));
  }
}
