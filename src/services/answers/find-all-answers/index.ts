import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllAnswersDTO } from '@/dtos/answers/find-all-answers.dto';
import { AnswerModel } from '@/models/answer.model';
import { FindAllAnswersQuery } from '@/queries/implements/answers/find-all-answers.query';

@Injectable()
export class FindAllAnswersService
  implements
    IBaseService<FindAllAnswersDTO, Promise<IPaginatedType<AnswerModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllAnswersDTO): Promise<IPaginatedType<AnswerModel>> {
    return await this.queryBus.execute(new FindAllAnswersQuery(data));
  }
}
