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
import { PaymentMethodModel } from '@/models/payment-method.model';
import { FindAllPaymentMethodsQuery } from '@/queries/implements/payment-methods/find-all-payment-methods.query';
import { CountPaymentMethodsRepository } from '@/repositories/payment-methods/count-payment-methods';
import { FindAllPaymentMethodsRepository } from '@/repositories/payment-methods/find-all-payment-methods';

@QueryHandler(FindAllPaymentMethodsQuery)
export class FindAllPaymentMethodsQueryHandler
  implements IQueryHandler<FindAllPaymentMethodsQuery>
{
  constructor(
    private readonly findAllPaymentMethodRepository: FindAllPaymentMethodsRepository,
    private readonly countPaymentMethodsRepository: CountPaymentMethodsRepository
  ) {}

  async execute(
    query: FindAllPaymentMethodsQuery
  ): Promise<IPaginatedType<PaymentMethodModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const paymentMethods = await this.findAllPaymentMethodRepository.execute(
      data
    );
    const totalCount = await this.countPaymentMethodsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<PaymentMethodModel>().toPaginationList({
      items: paymentMethods,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllPaymentMethodsQuery
  ): FindAllPaymentMethodsQuery {
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
