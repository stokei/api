import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllInvoicesDTO } from '@/dtos/invoices/find-all-invoices.dto';
import { InvoiceModel } from '@/models/invoice.model';
import { FindAllInvoicesQuery } from '@/queries/implements/invoices/find-all-invoices.query';

@Injectable()
export class FindAllInvoicesService
  implements
    IBaseService<FindAllInvoicesDTO, Promise<IPaginatedType<InvoiceModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllInvoicesDTO
  ): Promise<IPaginatedType<InvoiceModel>> {
    return await this.queryBus.execute(new FindAllInvoicesQuery(data));
  }
}
