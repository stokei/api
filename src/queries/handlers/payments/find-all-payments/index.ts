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
import { PaymentModel } from '@/models/payment.model';
import { FindAllPaymentsQuery } from '@/queries/implements/payments/find-all-payments.query';
import { CountPaymentsRepository } from '@/repositories/payments/count-payments';
import { FindAllPaymentsRepository } from '@/repositories/payments/find-all-payments';

@QueryHandler(FindAllPaymentsQuery)
export class FindAllPaymentsQueryHandler
  implements IQueryHandler<FindAllPaymentsQuery>
{
  constructor(
    private readonly findAllPaymentRepository: FindAllPaymentsRepository,
    private readonly countPaymentsRepository: CountPaymentsRepository
  ) {}

  async execute(
    query: FindAllPaymentsQuery
  ): Promise<IPaginatedType<PaymentModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const payments = await this.findAllPaymentRepository.execute(data);
    const totalCount = await this.countPaymentsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<PaymentModel>().toPaginationList({
      items: payments,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllPaymentsQuery): FindAllPaymentsQuery {
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
