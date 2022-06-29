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
import { PaymentsMethodModel } from '@/models/payments-method.model';
import { FindAllPaymentsMethodsQuery } from '@/queries/implements/payments-methods/find-all-payments-methods.query';
import { CountPaymentsMethodsRepository } from '@/repositories/payments-methods/count-payments-methods';
import { FindAllPaymentsMethodsRepository } from '@/repositories/payments-methods/find-all-payments-methods';

@QueryHandler(FindAllPaymentsMethodsQuery)
export class FindAllPaymentsMethodsQueryHandler
  implements IQueryHandler<FindAllPaymentsMethodsQuery>
{
  constructor(
    private readonly findAllPaymentsMethodRepository: FindAllPaymentsMethodsRepository,
    private readonly countPaymentsMethodsRepository: CountPaymentsMethodsRepository
  ) {}

  async execute(
    query: FindAllPaymentsMethodsQuery
  ): Promise<IPaginatedType<PaymentsMethodModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const paymentsMethods = await this.findAllPaymentsMethodRepository.execute(
      data
    );
    const totalCount = await this.countPaymentsMethodsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<PaymentsMethodModel>().toPaginationList({
      items: paymentsMethods,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllPaymentsMethodsQuery
  ): FindAllPaymentsMethodsQuery {
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
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
}
