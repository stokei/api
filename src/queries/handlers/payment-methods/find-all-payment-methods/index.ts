import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { PaymentMethodMapper } from '@/mappers/payment-methods';
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

    const data = new PaymentMethodMapper().toFindAllQueryClean(query);
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
}
