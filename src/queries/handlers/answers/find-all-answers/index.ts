import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  IOperator,
  IPaginatedType,
  PaginationMapper,
  cleanObject,
  cleanSortValue,
  cleanValueNumber,
  cleanWhereDataString,
  cleanWhereDataSearch,
  cleanValue,
  splitServiceId
} from '@stokei/nestjs';
import { DataNotFoundException } from '@/errors';
import { AnswerModel } from '@/models/answer.model';
import { FindAllAnswersQuery } from '@/queries/implements/answers/find-all-answers.query';
import { CountAnswersRepository } from '@/repositories/answers/count-answers';
import { FindAllAnswersRepository } from '@/repositories/answers/find-all-answers';

@QueryHandler(FindAllAnswersQuery)
export class FindAllAnswersQueryHandler
  implements IQueryHandler<FindAllAnswersQuery>
{
  constructor(
    private readonly findAllAnswerRepository: FindAllAnswersRepository,
    private readonly countAnswersRepository: CountAnswersRepository
  ) {}

  async execute(
    query: FindAllAnswersQuery
  ): Promise<IPaginatedType<AnswerModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const answers = await this.findAllAnswerRepository.execute(data);
    const totalCount = await this.countAnswersRepository.execute({
      where: data.where
    });
    return new PaginationMapper<AnswerModel>().toPaginationList({
      items: answers,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllAnswersQuery): FindAllAnswersQuery {
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
