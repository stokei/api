import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IPaginatedType,
  PaginationMapper,
  splitServiceId
} from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { QuestionModel } from '@/models/question.model';
import { FindAllQuestionsQuery } from '@/queries/implements/questions/find-all-questions.query';
import { CountQuestionsRepository } from '@/repositories/questions/count-questions';
import { FindAllQuestionsRepository } from '@/repositories/questions/find-all-questions';

@QueryHandler(FindAllQuestionsQuery)
export class FindAllQuestionsQueryHandler
  implements IQueryHandler<FindAllQuestionsQuery>
{
  constructor(
    private readonly findAllQuestionRepository: FindAllQuestionsRepository,
    private readonly countQuestionsRepository: CountQuestionsRepository
  ) {}

  async execute(
    query: FindAllQuestionsQuery
  ): Promise<IPaginatedType<QuestionModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const questions = await this.findAllQuestionRepository.execute(data);
    const totalCount = await this.countQuestionsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<QuestionModel>().toPaginationList({
      items: questions,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllQuestionsQuery): FindAllQuestionsQuery {
    if (!query) {
      return null;
    }
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          parent: cleanWhereDataString(operatorData.parent),
          name: cleanWhereDataSearch(operatorData.name),
          ids:
            operatorData.ids?.length > 0
              ? operatorData.ids.map((id) => splitServiceId(cleanValue(id))?.id)
              : undefined
        }
      };
    };
    return {
      ...query,
      where: {
        ...cleanObject(clearWhereOperatorData('AND')),
        ...cleanObject(clearWhereOperatorData('OR')),
        ...cleanObject(clearWhereOperatorData('NOT'), true)
      },
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        name: cleanSortValue(query.orderBy?.name),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt)
      })
    };
  }
}
