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
import { ProjectsMemberModel } from '@/models/projects-member.model';
import { FindAllProjectsMembersQuery } from '@/queries/implements/projects-members/find-all-projects-members.query';
import { CountProjectsMembersRepository } from '@/repositories/projects-members/count-projects-members';
import { FindAllProjectsMembersRepository } from '@/repositories/projects-members/find-all-projects-members';

@QueryHandler(FindAllProjectsMembersQuery)
export class FindAllProjectsMembersQueryHandler
  implements IQueryHandler<FindAllProjectsMembersQuery>
{
  constructor(
    private readonly findAllProjectsMemberRepository: FindAllProjectsMembersRepository,
    private readonly countProjectsMembersRepository: CountProjectsMembersRepository
  ) {}

  async execute(
    query: FindAllProjectsMembersQuery
  ): Promise<IPaginatedType<ProjectsMemberModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const projectsMembers = await this.findAllProjectsMemberRepository.execute(
      data
    );
    const totalCount = await this.countProjectsMembersRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ProjectsMemberModel>().toPaginationList({
      items: projectsMembers,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllProjectsMembersQuery
  ): FindAllProjectsMembersQuery {
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
