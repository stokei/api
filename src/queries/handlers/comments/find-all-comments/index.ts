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
import { CommentModel } from '@/models/comment.model';
import { FindAllCommentsQuery } from '@/queries/implements/comments/find-all-comments.query';
import { CountCommentsRepository } from '@/repositories/comments/count-comments';
import { FindAllCommentsRepository } from '@/repositories/comments/find-all-comments';

@QueryHandler(FindAllCommentsQuery)
export class FindAllCommentsQueryHandler
  implements IQueryHandler<FindAllCommentsQuery>
{
  constructor(
    private readonly findAllCommentRepository: FindAllCommentsRepository,
    private readonly countCommentsRepository: CountCommentsRepository
  ) {}

  async execute(
    query: FindAllCommentsQuery
  ): Promise<IPaginatedType<CommentModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const comments = await this.findAllCommentRepository.execute(data);
    const totalCount = await this.countCommentsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CommentModel>().toPaginationList({
      items: comments,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllCommentsQuery): FindAllCommentsQuery {
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
