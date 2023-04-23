import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { InvoiceMapper } from '@/mappers/invoices';
import { InvoiceModel } from '@/models/invoice.model';
import { FindAllInvoicesQuery } from '@/queries/implements/invoices/find-all-invoices.query';
import { CountInvoicesRepository } from '@/repositories/invoices/count-invoices';
import { FindAllInvoicesRepository } from '@/repositories/invoices/find-all-invoices';

@QueryHandler(FindAllInvoicesQuery)
export class FindAllInvoicesQueryHandler
  implements IQueryHandler<FindAllInvoicesQuery>
{
  constructor(
    private readonly findAllInvoiceRepository: FindAllInvoicesRepository,
    private readonly countInvoicesRepository: CountInvoicesRepository
  ) {}

  async execute(
    query: FindAllInvoicesQuery
  ): Promise<IPaginatedType<InvoiceModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new InvoiceMapper().toFindAllQueryClean(query);
    const invoices = await this.findAllInvoiceRepository.execute(data);
    const totalCount = await this.countInvoicesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<InvoiceModel>().toPaginationList({
      items: invoices,
      page: data.page,
      totalCount
    });
  }
}
