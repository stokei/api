import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { PaymentMapper } from '@/mappers/payments';
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

    const data = new PaymentMapper().toFindAllQueryClean(query);
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
}
